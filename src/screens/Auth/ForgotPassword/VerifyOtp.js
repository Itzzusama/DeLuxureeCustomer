import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";

import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Layout from "../../../components/Layout";
import OTPComponent from "../../../components/OTP";
import { className } from "../../../global-styles";
import { post } from "../../../services/ApiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "../../../utils/ToastMessage";
import { setUserType, setToken } from "../../../store/reducer/usersSlice";
import { useDispatch } from "react-redux";
import { colors } from "../../../utils/colors";
import Loader from "../../../components/Loader";

const VerifyOtp = () => {
  //
  const route = useRoute();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { requestData, verify } = route.params || {};
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [newToken, setNewToken] = useState(route?.params?.token);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(56);
  const resendCode = async () => {
    try {
      const apiData = {
        email: requestData.email,
      };

      const res =
        verify == "signup"
          ? await post("users/send-code", apiData)
          : await post("users/forget-password", apiData);
      if (res.data.message == "Verification code sent successfully") {
        console.log(res.data.verificationCode);
        ToastMessage(res.data.message);
        setNewToken(res?.data?.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePress = async () => {
    if (verify == "signup") {
      try {
        setLoading(true);
        const data = {
          email: requestData.email.trim().toLocaleLowerCase(),
          code: value,
        };
        console.log(data);
        const res = await post("users/verify-otp/registration", data);
        if (res.data.success) {
          ToastMessage(res.data.message);
          console.log(requestData);
          try {
            const response = await post("users/signup/customer", requestData);
            if (response.data.success) {
              await AsyncStorage.setItem("token", response.data?.token);
              dispatch(setUserType(response.data.user.type));
              dispatch(setToken(response.data.token));
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "MainStack",
                  },
                ],
              });
            }
          } catch (err) {
            console.log("err--", err.response.data.message);
          }
        } else {
          ToastMessage(res.data.message);
        }
      } catch (e) {
        console.log(e.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      const requestData = {
        code: value,
        token: newToken,
      };
      try {
        const resp = await post(
          "users/verify-otp/forget-password",
          requestData
        );
        if (resp.data.success) {
          navigation.navigate("NewPassword", { token: newToken });
        } else {
          ToastMessage(resp.data.message);
        }
      } catch (err) {
        ToastMessage("Verfication failed");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleResend = () => {
    setResendDisabled(true);
    setResendTimer(56); // Reset timer
    resendCode();
  };
  useEffect(() => {
    let interval;
    if (resendDisabled) {
      interval = setInterval(() => {
        if (resendTimer > 0) {
          setResendTimer((prevTimer) => prevTimer - 1);
        } else {
          setResendDisabled(false);
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendDisabled, resendTimer]);

  return (
    <Layout>
      <CustomText
        label={"Enter Verification Code"}
        fontFamily={fonts.bold}
        fontSize={22}
        marginTop={10}
      />
      <CustomText
        label={
          "We have sent you an OTP, check your email and put the code down below."
        }
        marginTop={10}
        fontSize={16}
        marginBottom={25}
      />

      <OTPComponent value={value} setValue={setValue} />
      <CustomButton
        title={"Submit"}
        onPress={handlePress}
        loading={loading}
        disabled={loading}
        customStyle={className("mt-8")}
      />
      <View style={className("align-self align-center mt-12")}>
        <CustomText
          label={"You can resend the code in 56 seconds"}
          fontFamily={fonts.medium}
        />

        <View style={className("flex mt-2")}>
          <TouchableOpacity onPress={handleResend} disabled={resendDisabled}>
            <CustomText
              label={"Resend Code"}
              fontFamily={fonts.bold}
              color={colors.headLine}
            />
          </TouchableOpacity>

          <CustomText
            label={`00:${String(resendTimer).padStart(2, "0")}`}
            fontFamily={fonts.bold}
            marginLeft={12}
            color={colors.headLine}
          />
        </View>
      </View>
    </Layout>
  );
};

export default VerifyOtp;
