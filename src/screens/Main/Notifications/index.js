import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import NoDataFound from "../../../components/NoDataFound";
import CustomText from "../../../components/CustomText";

import Item from "./molecules/Item";

import { Images } from "../../../assets/images";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { get } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import moment from "moment";
import Layout from "../../../components/Layout";

const Notifications = () => {
  const array = [
    {
      date: "New",
    },
    {
      color: "red",
    },
    {
      color: "blue",
    },
    {
      color: "red",
    },
    {
      date: "Yesterday",
    },
    {
      color: "blue",
    },
  ];
  const [notification, setNotification] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getNotifications = async () => {
    setRefreshing(true);
    try {
      const res = await get("notification/all");
      if (res.data?.success) {
        setNotification(res.data.notifications);
      } else {
        setNotification([]);
      }
    } catch (error) {
      console.log("err=====", error);
      ToastMessage(error.response.data?.message);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  const fetchMoreNotifications = async () => {
    if (notification?.length > 0) {
      const lastNoti = notification[notification?.length - 1]?._id;
      try {
        const res = await get(`notification/all/${lastNoti}`);
        if (res.data.success) {
          const newNoti = res.data.notifications;
          setNotification([...notification, ...newNoti]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Layout title={"Notifications"}>
      <FlatList
        data={notification}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <NoDataFound
            source={Images.noNotification}
            title="There are no notifications"
            title2="All notifications will appear here."
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getNotifications}
          />
        }
        onEndReachedThreshold={0.2}
        onEndReached={() => fetchMoreNotifications()}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) =>
          item.date ? (
            <View style={styles.heading}>
              <CustomText
                label={item.date}
                fontFamily={fonts.medium}
                color={colors.authText}
              />
            </View>
          ) : (
            <Item
              title={item?.title}
              description={item?.description}
              time={moment(item?.createdAt).fromNow()}
              source={Images.clip}
            />
          )
        }
      />
    </Layout>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  heading: {
    padding: 15,
    backgroundColor: colors.mainBg,
  },
});
