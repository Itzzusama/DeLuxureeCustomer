/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";

import CustomButton from "../../../components/CustomButton";
import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import { setUserType } from "../../../store/reducer/usersSlice";
import { signInWithApple, signInWithGoogle } from "../../../utils/authUtils";
import { Images } from "../../../assets/images";
import { GoogleIcon, AppleIcon, Email } from "../../../assets/images";
const GetStarted = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState({
    email: false,
    google: false,
    apple: false,
  });
  const socialLogin = [
    {
      id: "email",
      name: "Continue with Email",
      icon: <Email />,
    },
    {
      id: "google",
      name: "Sign in with Google",
      icon: <GoogleIcon />,
    },
  ];
  const AppleCard = [
    {
      id: "apple",
      name: "Sign in with Apple",
      icon: <AppleIcon />,
    },
  ];
  const handleSocialLogin = async (id) => {
    if (id === "google") {
      await signInWithGoogle(navigation, dispatch, setLoading);
    } else if (id === "email") {
      navigation.navigate("Signup");
    } else {
      await signInWithApple(navigation, dispatch, setLoading);
    }
  };

  return (
    <Layout
      isSafeAreaView={false}
      showNavBar={false}
      translucent
      isScroll={false}
      StatusBarBg="transparent"
      layoutContainer={{ paddingHorizontal: 0 }}
      barStyle={"light-content"}
    >
      <ImageBackground
        source={Images.bg}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        imageStyle={{ resizeMode: "stretch" }}
      >
        <View
          style={[
            className("px-6"),
            { bottom: 0, position: "absolute", width: "100%" },
          ]}
        >
          <View style={className("mb-6")}>
            {[...socialLogin, ...(Platform.OS == "ios" ? AppleCard : [])].map(
              (item) => (
                <TouchableOpacity
                  key={item.id}
                  style={className(
                    "flex flex-row align-center justify-center bg-white p-4 mb-3 rounded-2"
                  )}
                  activeOpacity={0.8}
                  onPress={() => handleSocialLogin(item.id)}
                  disabled={loading[item.id]}
                >
                  {loading[item.id] ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primaryColor}
                    />
                  ) : (
                    <>
                      {item?.icon}
                      <CustomText
                        label={item?.name}
                        textStyle={className("text-16 text-med text-2C ml-2")}
                      />
                    </>
                  )}
                </TouchableOpacity>
              )
            )}
            <TouchableOpacity
              style={className("flex algin-center justify-center mt-4 mb-2")}
              onPress={() => navigation.navigate("Login")}
              activeOpacity={0.8}
            >
              <CustomText
                label={"Already have an account? "}
                textStyle={className("text-14 text-white")}
              />
              <CustomText
                label={"Login"}
                textStyle={className("text-14 text-white text-med")}
              />
            </TouchableOpacity>
            <CustomText
              label={"or"}
              textStyle={className("text-11 text-white")}
              alignSelf={"center"}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: "MainStack",
                    },
                  ],
                });
              }}
            >
              <CustomText
                label={"Continue as guest"}
                textStyle={className("text-14 text-white")}
                textDecorationLine={"underline"}
                alignSelf={"center"}
                lineHeight={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Layout>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
    alignSelf: "flex-end",
    resizeMode: "center",
    marginRight: 30,
    marginBottom: 30,
  },
  img: {
    width: "80%",
    flex: 1,
    alignSelf: "center",
    resizeMode: "stretch",
  },
});
