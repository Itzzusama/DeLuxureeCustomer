/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import { AppleIcon, GoogleIcon } from "../../../assets/images";
import PhoneNumberInput from "../../../components/PhoneNumberInput";
import Error from "../../../components/Error";
import checkEmail from "../../../utils/checkEmail";
import checkPhone from "../../../utils/checkPhone";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NotificationListner,
  requestUserPermission,
} from "../../../utils/pushnotification_helper";
import { post } from "../../../services/ApiRequest";
import { colors } from "../../../utils/colors";
import { ToastMessage } from "../../../utils/ToastMessage";

const Signup = () => {
  const phoneInput = useRef(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email format is not valid"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be 8 characters `)
      .required("Password is required"),
    phoneNumber: Yup.string().optional(),
  });

  const navigation = useNavigation();
  const [error, setError] = useState({
    emailError: false,
    show: false,
  });
  const [errorPhone, setErrorPhone] = useState({
    emailError: false,
    show: false,
  });

  useEffect(() => {
    if (email !== "") {
      checkEmail(email, setError);
    }
  }, [email]);

  useEffect(() => {
    if (phone !== "") {
      checkPhone(phoneInput, phone, setErrorPhone);
    }
  }, [phone]);
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);

  const regUser = async (values) => {
    setLoading(true);
    const fcmtoken = await AsyncStorage.getItem("fcmToken");
    const emailError = await checkEmail(values.email, setError);
    // const phoneError = await checkPhone(
    //   phoneInput,
    //   values.phoneNumber,
    //   setErrorPhone
    // );

    if (!emailError) {
      const {
        formattedNumber,
      } = phoneInput.current.getNumberAfterPossiblyEliminatingZero();
      const SignupData = {
        email: values.email,
        phone: formattedNumber,
        password: values.password,
        fcmtoken: fcmtoken,
        name: values.name,
      };

      try {
        const reqData = { email: values.email, user_type: "customer" };
        const res = await post("users/send-code", reqData);
        if (res.data.message == "Verification code sent successfully") {
          console.log(res.data.verificationCode);
          navigation.navigate("VerifyOtp", {
            requestData: SignupData,
            verify: "signup",
          });
        } else {
          ToastMessage(res?.data?.message);
        }
      } catch (err) {
        console.log("error: " + err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout
      footerComponent={
        <View style={className("justify-center align-center flex mb-5")}>
          <CustomText
            label={"Already have an account?"}
            fontSize={15}
            marginRight={5}
          />
          <CustomText
            label={"Login"}
            fontFamily={fonts.semiBold}
            fontSize={15}
            color={colors.headLine}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      }
    >
      <CustomText
        label={"Create Your Account"}
        fontFamily={fonts.bold}
        fontSize={22}
        marginTop={10}
      />
      <CustomText
        label={
          "Submit all the details to create an account with us and discover all the top-notch cleaning services."
        }
        marginTop={5}
        marginBottom={15}
        fontSize={16}
      />

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
        }}
        onSubmit={(values) => regUser(values)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          setFieldTouched,
        }) => (
          <>
            <CustomInput
              withLabel={"Full Name"}
              placeholder={"Enter your name"}
              value={values.name}
              onBlur={() => setFieldTouched("name")}
              onChangeText={(text) => handleChange("name")(text)}
              error={touched.name && errors.name}
            />
            <Error error={errors.name} visible={touched.name} />
            <CustomInput
              withLabel={"Email"}
              placeholder={"Enter your email"}
              keyboardType={"email-address"}
              value={values.email}
              onBlur={() => setFieldTouched("email")}
              onChangeText={(text) => {
                handleChange("email")(text);
                setEmail(text);
              }}
              error={(touched.email && errors.email) || !error.emailError}
            />
            <Error error={errors.email} visible={touched.email} />
            {error.emailError && (
              <Error visible={error.show} error="Email already registered" />
            )}
            <CustomInput
              withLabel={"Password"}
              placeholder={"Enter your password"}
              secureTextEntry
              value={values.password}
              onBlur={() => setFieldTouched("password")}
              onChangeText={(text) => handleChange("password")(text)}
              error={touched.password && errors.password}
            />
            <Error error={errors.password} visible={touched.password} />

            <PhoneNumberInput
              phoneInput={phoneInput}
              value={values.phoneNumber}
              defaultValue={values.phoneNumber}
              onChangeText={(text) => {
                handleChange("phoneNumber")(text);
                setPhone(text);
              }}
              error={
                (touched.phoneNumber && errors.phoneNumber) ||
                !errorPhone.emailError
              }
            />
            <Error error={errors.phoneNumber} visible={touched.phoneNumber} />
            {errorPhone.emailError && (
              <Error
                visible={errorPhone.show}
                error="Phone number already registered"
              />
            )}

            <CustomButton
              title={"Sign Up"}
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
            />
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default Signup;
