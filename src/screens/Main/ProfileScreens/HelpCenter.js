import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

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
import Error from "../../../components/Error";
import { post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import CustomInput from "../../../components/CustomInput";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .label("Email"),
  msg: Yup.string().required("Message is required"),
});
const HelpCenter = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handlePress = async (values) => {
    try {
      setLoading(true);
      const body = {
        name: values.name,
        email: values.email,
        msg: values.msg,
      };
      const res = await post("support/create", body);
      if (res.data.success) {
        ToastMessage("Submitted successfully!");
        navigation.goBack();
      } else {
        ToastMessage("Couldn't Submit, please try again");
      }
    } catch (err) {
      ToastMessage("Couldn't Submit, please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout title={"Help & Support"}>
      <Formik
        initialValues={{ name: "", email: "", msg: "" }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => handlePress(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            <CustomInput
              withLabel={"Full Name"}
              marginTop={5}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              error={touched.name && errors.name}
              placeholder={"Name"}
            />
            <Error error={errors.name} visible={touched.name} />
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
              withLabel={"Message"}
              placeholder={"Type here.."}
              containerStyle={className("h-30")}
              textAlignVertical={"top"}
              multiline
              onChangeText={handleChange("msg")}
              onBlur={handleBlur("msg")}
              value={values.msg}
              error={touched.msg && errors.msg}
            />
            <Error error={errors.msg} visible={touched.msg} />

            <CustomButton
              title={"Submit"}
              customStyle={className("my-8")}
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

export default HelpCenter;
