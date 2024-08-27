import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../../components/Error";
import { AppleIcon, GoogleIcon } from "../../../assets/images";
import { ToastMessage } from "../../../utils/ToastMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserType } from "../../../store/reducer/usersSlice";
import { post } from "../../../services/ApiRequest";
import { colors } from "../../../utils/colors";
import { signInWithApple, signInWithGoogle } from "../../../utils/authUtils";
import {
  NotificationListner,
  requestUserPermission,
} from "../../../utils/pushnotification_helper";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .label("Email"),
  password: Yup.string().required("Password is required").label("Password"),
});
const Login = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);
  const socialLogin = [
    {
      id: "google",
      name: "Google",
      icon: <GoogleIcon />,
    },
  ];
  const AppleCard = [
    {
      id: "apple",
      name: "Apple",
      icon: <AppleIcon />,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState({
    google: false,
    apple: false,
  });
  const type = useSelector((state) => state.user.userType);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const LoginUser = async (args) => {
    const fcmtoken = await AsyncStorage.getItem("fcmToken");
    setIsLoading(true);
    try {
      const reqData = {
        email: args.email.trim().toLocaleLowerCase(),
        password: args.password,
        fcmtoken: fcmtoken,
        user_type: "customer",
      };
      const res = await post("auth", reqData);
      if (res.data.token && res?.data?.user?.type == "customer") {
        await AsyncStorage.setItem("token", res.data.token);
        dispatch(setUserType(res.data.user.type));
        dispatch(setToken(res.data.token));
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "MainStack",
            },
          ],
        });
      } else {
        ToastMessage(res.data.message);
      }
    } catch (err) {
      ToastMessage(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSocialLogin = async (id) => {
    if (id === "google") {
      await signInWithGoogle(navigation, dispatch, setLoading);
    } else {
      await signInWithApple(navigation, dispatch, setLoading);
    }
  };
  return (
    <Layout
      footerComponent={
        <View style={className("justify-center align-center flex mb-5")}>
          <CustomText
            label={"Don't have an account?"}
            fontSize={15}
            marginRight={5}
          />
          <CustomText
            label={"Signup"}
            fontFamily={fonts.semiBold}
            fontSize={15}
            onPress={() => navigation.navigate("Signup")}
            color={colors.headLine}
          />
        </View>
      }
    >
      <CustomText
        label={"Welcome Back! 👋"}
        fontFamily={fonts.bold}
        fontSize={22}
        marginTop={10}
      />
      <CustomText
        label={
          "We're thrilled to see you again! Look for the best cleaning service in town."
        }
        marginTop={5}
        marginBottom={15}
        fontSize={16}
      />

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => LoginUser(values)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          touched,
          errors,
          setFieldTouched,
          values,
          isValid,
        }) => (
          <>
            <CustomInput
              withLabel={"Email"}
              placeholder={"Enter your email"}
              keyboardType={"email-address"}
              value={values.email}
              onBlur={() => setFieldTouched("email")}
              onChangeText={handleChange("email")}
              error={touched.email && errors.email}
            />
            <Error error={errors.email} visible={touched.email} />
            <CustomInput
              withLabel={"Password"}
              placeholder={"Enter your password"}
              secureTextEntry
              value={values.password}
              onBlur={() => setFieldTouched("password")}
              onChangeText={handleChange("password")}
              error={touched.password && errors.password}
            />
            <Error error={errors.password} visible={touched.password} />
            <CustomText
              label={"Forgot Password?"}
              fontSize={15}
              onPress={() => navigation.navigate("ForgotPassword")}
              alignSelf={"flex-end"}
              marginBottom={15}
              fontFamily={fonts.medium}
              color={colors.headLine}
            />
            <CustomButton
              title={"Log In"}
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
            />
          </>
        )}
      </Formik>

      <View style={className("justify-between align-center flex mt-7")}>
        <View style={className("h-0.3 flex-1 bg-grey1")} />
        <CustomText label={"Or With"} paddingHorizontal={12} />
        <View style={className("h-0.3 flex-1 bg-grey1")} />
      </View>
      <View style={className("justify-between align-center flex mt-6 mb-5")}>
        {[...socialLogin, ...(Platform.OS == "ios" ? AppleCard : [])].map(
          (item) => (
            <TouchableOpacity
              key={item.id}
              style={className(
                "bg-white justify-center align-center flex bor-1 border-lightGrey flex-1 rounded-2 h-13 ml-2"
              )}
              activeOpacity={0.7}
              onPress={() => handleSocialLogin(item.id)}
              disabled={loading[item.id]}
            >
              {loading[item.id] ? (
                <ActivityIndicator size="small" color={colors.primaryColor} />
              ) : (
                <>
                  {item?.icon}
                  <CustomText label={item?.name} marginLeft={5} fontSize={16} />
                </>
              )}
            </TouchableOpacity>
          )
        )}
      </View>
    </Layout>
  );
};

export default Login;
