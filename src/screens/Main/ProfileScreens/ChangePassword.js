import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Error from "../../../components/Error";
import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import ProfileHeader from "../../../components/ProfileHeader";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
const ChangePassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const ValidationSchema = yup.object().shape({
    old_password: yup.string().required("Old Password is required"),
    password: yup
      .string()
      .min(
        8,
        ({ min }) => `New password must contain at least ${min} characters`
      )
      .required("New Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password does not match")
      .required("Confirm Password is required"),
  });
  const changePassword = async (values) => {
    setIsLoading(true);
    const ApiData = {
      oldPassword: values.old_password,
      newPassword: values.confirmPassword,
    };

    try {
      const res = await put("users/change-password", ApiData);
      if (res.data.success) {
        ToastMessage("Password was successfully changed");
        navigation.goBack();
      } else {
        ToastMessage("Old password is incorrect");
      }
    } catch (err) {
      ToastMessage("Old password is incorrect");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout title={"Change Password"}>
      <Formik
        initialValues={{
          old_password: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={ValidationSchema}
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
              withLabel={"Old Password"}
              placeholder={"Old Password"}
              value={values.old_password}
              onBlur={() => setFieldTouched("old_password")}
              onChangeText={handleChange("old_password")}
              error={touched.old_password && errors.old_password}
              secureTextEntry={true}
              marginTop={20}
            />
            <Error error={errors.old_password} visible={touched.old_password} />
            <CustomInput
              withLabel={"New Password"}
              placeholder={"New Password"}
              value={values.password}
              onBlur={() => setFieldTouched("password")}
              onChangeText={handleChange("password")}
              error={touched.password && errors.password}
              secureTextEntry={true}
            />
            <Error error={errors.password} visible={touched.password} />
            <CustomInput
              withLabel={"Confirm password"}
              placeholder={"Confirm password"}
              value={values.confirmPassword}
              onBlur={() => setFieldTouched("confirmPassword")}
              onChangeText={handleChange("confirmPassword")}
              error={touched.confirmPassword && errors.confirmPassword}
              secureTextEntry={true}
            />
            <Error
              error={errors.confirmPassword}
              visible={touched.confirmPassword}
            />
            <CustomButton
              title={"update"}
              customStyle={className("mt-5")}
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
            />
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default ChangePassword;
