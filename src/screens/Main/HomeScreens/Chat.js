import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";

import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import SearchBar from "../../../components/SearchBar";
import ChatListCard from "../../../components/ChatListCard";
import { useNavigation } from "@react-navigation/native";
import { get } from "../../../services/ApiRequest";
import NoDataFound from "../../../components/NoDataFound";
import { Images } from "../../../assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";

const Chat = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [tokenExists, setTokenExists] = useState(false);
  const [loadingToken, setLoadingToken] = useState(true);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setTokenExists(!!token);
    };
    checkToken();
  }, []);
  const fetchConversations = async () => {
    try {
      const res = await get("msg/conversations");

      if (res.data.success) {
        setConversation(res.data.conversations);
        setFilterData(res.data.conversations);
      }
    } catch (error) {
      console.log("Failed to get conversations");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    await fetchConversations();
  }, []);

  useLayoutEffect(() => {
    fetchConversations();
  }, []);

  const handleNavigation = async (item) => {
    const dataToSend = {
      id: item?.otherUser?._id,
      img: item?.otherUser?.profilePicture,
      name: item?.otherUser?.name,
      type: item?.otherUser?.type,
    };
    navigation.navigate("InBox", { data: dataToSend });
  };

  const getMoreConversations = async () => {
    if (filterData?.length > 0) {
      const lastItem = filterData[filterData?.length - 1]?._id;
      try {
        const res = await get(`msg/conversations/${lastItem}`);

        if (res.data.success) {
          const newConverstion = res.data.conversations;
          setConversation([...conversation, ...newConverstion]);
          setFilterData([...conversation, ...newConverstion]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSearch = (query) => {
    let text = query.toLowerCase();
    if (!text || text === "") {
      setFilterData(conversation);
    } else {
      const filterJob = conversation.filter((conv) =>
        conv?.otherUser?.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilterData(filterJob);
    }
  };

  if (!tokenExists) {
    return (
      <Layout title={"Chat"}>
        <View style={className("flex-1 align-center justify-center ")}>
          <CustomText
            label={"Please log in to access your chat."}
            fontSize={16}
            color={colors.gray}
            textAlign="center"
          />
          <CustomButton
            title={"Login"}
            customStyle={className("mt-8 w-70")}
            onPress={() => {
              navigation.reset({ index: 0, routes: [{ name: "AuthStack" }] });
            }}
          />
        </View>
      </Layout>
    );
  }
  return (
    <Layout
      title={"Chat"}
      customArrow={{ backgroundColor: colors.mainBg }}
      isScroll
    >
      <SearchBar
        customInput={{ backgroundColor: colors.grey3 }}
        handleSearch={handleSearch}
      />
      <View style={className("mt-2")}>
        <FlatList
          data={filterData}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.2}
          onEndReached={() => getMoreConversations()}
          renderItem={({ item }) => (
            <ChatListCard item={item} onPress={() => handleNavigation(item)} />
          )}
          ListEmptyComponent={
            <NoDataFound
              source={Images.noShow}
              title="You have not received any messages"
              title2="All messages will appear here."
            />
          }
        />
      </View>
    </Layout>
  );
};

export default Chat;
