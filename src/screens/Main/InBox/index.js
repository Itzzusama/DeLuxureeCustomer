import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { View, FlatList, StyleSheet } from "react-native";
import moment from "moment";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";

import Header from "./Header";
import Footer from "./Footer";
import ChatBubble from "./ChatBubble";
import { Images } from "../../../assets/images";

import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "../../../services/ApiRequest";
import { useRoute } from "@react-navigation/native";
import { formatDate, formatRelativeDate } from "../../../utils/dateUtils";
import fonts from "../../../assets/fonts";

const Inbox = () => {
  const route = useRoute();
  const flatListRef = useRef(null);
  const userData = useSelector((state) => state?.user?.loginUser);
  const dispatch = useDispatch();
  const data = route.params?.data;
  const { users } = useSelector((state) => state?.user?.loginUser);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = userData?._id;

  const handleScroll = () => {
    setScrolled(true);
  };

  const fetchMessages = async () => {
    try {
      const response = await get("msg/messages/" + data?.id);
      if (response.data) {
        setMessages(response.data?.messages);
      }
    } catch (error) {
      console.log("errrrrrr", error);
    }
  };

  const getMoreMessages = async () => {
    try {
      if (messages?.length > 0 && !bottomLoader) {
        setBottomLoader(true);
        const lastId = messages[messages?.length - 1]?._id;
        const url = "msg/messages/" + data?.id + "/" + lastId;
        const response = await get(url);
        if (response.data?.success) {
          setMessages([...messages, ...response.data?.messages]);
        }
        setTimeout(() => {
          setBottomLoader(false);
          setScrolled(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error, "in getting more msgs");
      setTimeout(() => {
        setBottomLoader(false);
        setScrolled(false);
      }, 1000);
    }
  };

  const sendMsg = () => {
    if (socket) {
      socket.emit("send-message", {
        recipientId: data?.id,
        messageText: inputText,
        name: users?.name,
      });
      setInputText("");
    } else {
      console.log("Socket is null or not properly initialized");
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1) || "";
  };

  useEffect(() => {
    const newSocket = io("https://deluxcleaning.onrender.com");

    newSocket.on("connect", async () => {
      const token = await AsyncStorage.getItem("token");
      newSocket.emit("authenticate", token);
    });

    newSocket.on("authenticated", (id) => {
      setSocket(newSocket);
    });

    newSocket.on("send-message", (msg) => {
      setMessages((prevMessages) => [msg, ...prevMessages]);
    });

    newSocket.on("send_message_error", (error) => {
      console.log("error", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (data?.id) {
      fetchMessages();
    }
  }, [data?.id]);

  useEffect(() => {
    getMoreMessages();
  }, [scrolled]);

  return (
    <ScreenWrapper
      paddingHorizontal={10}
      footerUnScrollable={() => (
        <Footer
          inputText={inputText}
          setInputText={setInputText}
          sendMessage={sendMsg}
        />
      )}
      headerUnScrollable={() => (
        <Header
          source={data?.img ? { uri: data?.img } : Images.user}
          title={data?.name}
          desc={"Service Expert"}
        />
      )}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        inverted
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const previousItem = messages[index + 1];
          const showDate =
            !previousItem ||
            formatDate(item.createdAt) !== formatDate(previousItem?.createdAt);
          return (
            <>
              <ChatBubble
                item={item}
                isSender={item.sender == userData?._id ? true : false}
                recImg={data?.img}
                senderImg={userData?.profilePicture}
              />
              {showDate && (
                <CustomText
                  label={formatRelativeDate(item?.createdAt)}
                  alignSelf={"center"}
                  marginTop={12}
                  fontFamily={fonts.bold}
                />
              )}
            </>
          );
        }}
        keyExtractor={(_, i) => i.toString()}
        style={styles.messageList}
        onScrollEndDrag={handleScroll}
      />
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
export default Inbox;
