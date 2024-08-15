/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

// screens ----------------------------
import Home from "../screens/Main/HomeScreens/Home";
import Search from "../screens/Main/HomeScreens/Search";
import Orders from "../screens/Main/Orders";
import Chat from "../screens/Main/HomeScreens/Chat";
import Account from "../screens/Main/HomeScreens/Account";
// ------------------------------------
import HomeIcon from "../assets/images/homeIcon";
import SearchIcon from "../assets/images/searchIcons";
import ChatIcon from "../assets/images/chatIcon";
import AccountIcon from "../assets/images/accountIcons";
import { CalendarIcon } from "../assets/images";
import fonts from "../assets/fonts";
import Icons from "../components/Icons";
import { colors } from "../utils/colors";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getUserProfile } from "../store/reducer/usersSlice";
import { fetchCategories } from "../store/reducer/categorySlice";
import { fetchServices } from "../store/reducer/servicesSlice";
import { fetchNoti } from "../store/reducer/unseenNotiSlice";

const Tab = createBottomTabNavigator();

const TabStack = () => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserProfile);
      dispatch(fetchCategories());
      dispatch(fetchNoti());
      return () => {};
    }, [])
  );
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors.tabIcon,
        tabBarInactiveTintColor: colors.tabInActive,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12, fontFamily: fonts.semiBold, top: -5 },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <SearchIcon focused={focused} />,
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: colors.primaryColor,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                padding: 14,
                top: Platform.OS === "ios" ? -5 : 8,
                // Shadow properties for iOS
                ...Platform.select({
                  ios: {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  },
                  // Elevation for Android
                  android: {
                    elevation: 5,
                  },
                }),
              }}
            >
              <CalendarIcon />
            </View>
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <ChatIcon focused={focused} />,
        }}
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <AccountIcon focused={focused} />,
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    paddingBottom: 10,
    elevation: 0,
    borderTopWidth: 0,
    backgroundColor: colors.white,
  },
});
