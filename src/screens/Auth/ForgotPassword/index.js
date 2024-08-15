import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";

import fonts from "../../../assets/fonts";
import Layout from "../../../components/Layout";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import { post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import Error from "../../../components/Error";
import { className } from "../../../global-styles";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Inavlid email format"),
});
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handleReq = async (values) => {
    setLoading(true);

    try {
      const data = {
        email: values.email,
      };
      const res = await post("users/forget-password", data);
      if (res.data.message == "Verification code sent successfully") {
        console.log(res.data.verificationCode);
        ToastMessage(res.data.message);
        navigation.navigate("VerifyOtp", {
          verify: "password",
          token: res.data.token,
          requestData: data,
        });
      } else {
        ToastMessage("Unknown email");
      }
    } catch (err) {
      ToastMessage("Unknown email");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      footerComponent={
        <View style={className("justify-center align-center flex mb-5")}>
          <CustomText
            label={"Remember password?"}
            fontSize={15}
            marginRight={5}
          />
          <CustomText
            label={"Login"}
            fontFamily={fonts.semiBold}
            fontSize={15}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      }
    >
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={(values) => handleReq(values)}
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
            <CustomText
              label={"Forgot Password"}
              fontFamily={fonts.bold}
              fontSize={22}
              marginTop={10}
            />
            <CustomText
              label={
                "Submit your email here, so we can send you link to retrieve your account."
              }
              marginTop={5}
              marginBottom={25}
              fontSize={16}
            />
            <CustomInput
              withLabel={"Email address"}
              placeholder={"Your email"}
              keyboardType={"email-address"}
              value={values.email}
              onBlur={() => setFieldTouched("email")}
              onChangeText={(text) => handleChange("email")(text)}
              error={touched.email && errors.email}
            />
            <Error error={errors.email} visible={touched.email} />
            <CustomButton
              title={"Send OTP"}
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

export default ForgotPassword;
