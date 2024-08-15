/* eslint-disable react/no-unstable-nested-components */
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import CancelledOrders from "./CancelledOrders";
import CompletedOrders from "./CompletedOrders";
import fonts from "../../../assets/fonts";
import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import Icons from "../../../components/Icons";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator();

const Orders = () => {
  return (
    <Layout title={"Past Bookings"} layoutContainer={{ paddingHorizontal: 0 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { elevation: 0 },
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarActiveTintColor: colors.primaryColor,
          tabBarInactiveTintColor: colors.black,
          tabBarLabelStyle: {
            fontFamily: fonts.medium,
            fontSize: 14,
            textTransform: "none",
          },
          tabBarIndicatorStyle: { backgroundColor: colors.primaryColor },
        }}
      >
        <Tab.Screen
          name="Completed"
          component={CompletedOrders}
          options={styles.tabBarStyle}
        />
        <Tab.Screen
          name="Cancelled"
          component={CancelledOrders}
          options={styles.tabBarStyle}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default Orders;

const styles = StyleSheet.create({
  tabBarItemStyle: {
    backgroundColor: colors.mainBg,
  },
  tabBarLabelStyle: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    textTransform: "none",
  },
  tabBarStyle: {
    tabBarLabelStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      textTransform: "none",
      //width: 100,
    },
    tabBarIndicatorStyle: { backgroundColor: colors.primaryColor },
  },
});
