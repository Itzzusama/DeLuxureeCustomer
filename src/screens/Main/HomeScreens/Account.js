import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import ProfileHeader from "../../../components/ProfileHeader";
import CustomButton from "../../../components/CustomButton";
import {
  Help,
  History,
  Lock,
  Next,
  Person,
  Security,
} from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import LogoutSheet from "../../../components/LogoutSheet";
import Icons from "../../../components/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
const personalInfo = [
  { id: "Profile", icon: <Person />, name: "Profile" },
  { id: "PastBooking", icon: <History />, name: "Past Bookings" },
  { id: "SavedServices", icon: <History />, name: "Liked Services" },
];
const security = [
  { id: "ChangePassword", icon: <Lock />, name: "Change Password" },
];

const about = [
  { id: "Policy", icon: <Security />, name: "Privacy & Policy" },
  { id: "HelpCenter", icon: <Help />, name: "Help & Support" },
];
const renderOption = (item, navigation) => (
  <TouchableOpacity
    key={item?.id}
    style={className("flex align-center justify-between mb-6")}
    onPress={() => {
      navigation.navigate(item?.id);
    }}
  >
    <View style={className("flex align-center")}>
      {item?.id == "SavedServices" ? (
        <View style={className("w-6")}>
          <Icons
            family={"AntDesign"}
            color={"#111111"}
            size={20}
            name={"hearto"}
          />
        </View>
      ) : (
        item?.icon
      )}

      <CustomText
        label={item?.name}
        fontSize={16}
        fontFamily={fonts.medium}
        color={"#111111"}
        marginLeft={8}
      />
    </View>
    <Next />
  </TouchableOpacity>
);
const Account = () => {
  const token = useSelector((state) => state?.user?.token);
  const [sheetType, setSheetType] = useState("logout");
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const openBottomSheet = (type) => {
    sheetRef.current.open();
    setSheetType(type);
  };
  if (!token) {
    return (
      <Layout title={"Settings"}>
        <View style={className("flex-1 align-center justify-center ")}>
          <CustomText
            label={"Please log in to access your account settings."}
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
      title={"Settings"}
      isScroll
      footerComponent={
        <>
          <CustomButton
            title={"Delete Account"}
            customStyle={className("bg-mainBg border-red bor-1 mb-1")}
            customText={className("text-red text-bold")}
            onPress={() => {
              openBottomSheet("del_account");
            }}
          />
          <CustomButton
            title={"Logout"}
            customStyle={className("mb-5")}
            onPress={() => {
              openBottomSheet("logout");
            }}
          />
        </>
      }
    >
      <ProfileHeader />
      <CustomText
        label={"Personal Info"}
        fontSize={12}
        color={"#111111"}
        marginBottom={14}
        marginTop={16}
      />
      {personalInfo?.map((item) => renderOption(item, navigation))}
      <CustomText
        label={"Security"}
        fontSize={12}
        color={"#111111"}
        marginBottom={14}
      />
      {security?.map((item) => renderOption(item, navigation))}
      <CustomText
        label={"About"}
        fontSize={12}
        color={"#111111"}
        marginBottom={14}
      />
      {about?.map((item) => renderOption(item, navigation))}

      <LogoutSheet bottomSheetRef={sheetRef} type={sheetType} />
    </Layout>
  );
};

export default Account;
