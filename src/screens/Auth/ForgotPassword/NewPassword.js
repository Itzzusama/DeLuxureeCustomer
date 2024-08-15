import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";
import { Formik } from "formik";
import * as yup from "yup";
import Error from "../../../components/Error";
import { ToastMessage } from "../../../utils/ToastMessage";
import { post, put } from "../../../services/ApiRequest";
const ValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, ({ min }) => `Password must contain at least 8 characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Confirm Password is required"),
});
const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const handleReq = async (values) => {
    const ApiData = {
      password: values.password,
      token: route.params.token,
    };
    console.log(ApiData);
    try {
      setLoading(true);
      const res = await put("users/update-password", ApiData);
      ToastMessage(res.data.message);
      if (res.data.success) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "AuthStack",
              state: {
                routes: [{ name: "Login" }],
              },
            },
          ],
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => handleReq(values)}
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
            <CustomText
              label={"Create New Password"}
              fontFamily={fonts.bold}
              fontSize={22}
              marginTop={10}
            />
            <CustomText
              label={
                "Create a new password and confirm it to login  next time."
              }
              marginTop={10}
              fontSize={16}
            />
            <CustomText
              label={route.params?.email}
              fontFamily={fonts.semiBold}
              marginBottom={25}
              fontSize={16}
              marginTop={-20}
            />
            <CustomInput
              withLabel={"New Password"}
              placeholder={"Enter new password"}
              value={values.password}
              onBlur={() => setFieldTouched("password")}
              onChangeText={(text) => handleChange("password")(text)}
              error={touched.password && errors.password}
              secureTextEntry={true}
            />
            <Error error={errors.password} visible={touched.password} />
            <CustomInput
              withLabel={"Confirm Password"}
              placeholder={"Enter confirm password"}
              value={values.confirmPassword}
              onBlur={() => setFieldTouched("confirmPassword")}
              onChangeText={(text) => handleChange("confirmPassword")(text)}
              error={touched.confirmPassword && errors.confirmPassword}
              secureTextEntry={true}
            />
            <Error
              error={errors.confirmPassword}
              visible={touched.confirmPassword}
            />
            <CustomButton
              title={"Change Password"}
              onPress={handleSubmit}
              customStyle={className("mt-5")}
              loading={loading}
              disabled={loading}
            />
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default NewPassword;
