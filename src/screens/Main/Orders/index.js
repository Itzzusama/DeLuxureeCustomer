/* eslint-disable react/no-unstable-nested-components */
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import PendingOrders from "./PendingOrders";
import AcceptedOrders from "./AcceptedOrders";
import CompletedRequest from "./CompletedRequest";

import fonts from "../../../assets/fonts";
import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import Icons from "../../../components/Icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
import { className } from "../../../global-styles";

const Tab = createMaterialTopTabNavigator();

const Orders = () => {
  const navigation = useNavigation();
  const [tokenExists, setTokenExists] = useState(false);
  useEffect(() => {
    // Check if token exists in AsyncStorage
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setTokenExists(!!token);
    };
    checkToken();
  }, []);
  if (!tokenExists) {
    return (
      <Layout title={"Bookings"}>
        <View style={className("flex-1 align-center justify-center ")}>
          <CustomText
            label={"Please log in to access your bookings"}
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
    <Layout title={"Bookings"} layoutContainer={{ paddingHorizontal: 0 }}>
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
          name="Pending"
          component={PendingOrders}
          options={styles.tabBarStyle}
        />
        <Tab.Screen
          name="In-Progress"
          component={AcceptedOrders}
          options={styles.tabBarStyle}
        />
        <Tab.Screen
          name="Awaiting Completion"
          component={CompletedRequest}
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
