import React, { useState } from "react";
import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";
import { colors } from "../../../utils/colors";
import ServiceCard from "../../../components/ServiceCard";
import StarRating from "../../../components/StarRating"; // Import the StarRating component
import { useNavigation, useRoute } from "@react-navigation/native";
import { post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";

const Review = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { detail } = route.params;
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const submitRating = async () => {
    if (rating == 0) {
      ToastMessage("Please provide rating");
      return;
    }
    if (!feedback) {
      ToastMessage("Please enter feedback");
      return;
    }
    try {
      setLoading(true);
      const ApiData = {
        to_id: detail?.to_id?._id,
        rating: rating,
        review: feedback,
        order: detail?._id,
        service: detail?.service?._id,
        type: "customer", //["customer","employee"]
      };
      const res = await post("rating/create", ApiData);
      if (res.data.success) {
        ToastMessage("Feedback submitted!");
        navigation.navigate("HomeStack", { screen: "Orders" });
      }
    } catch (err) {
      console.log(er);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title={"Review"}
      isScroll
      footerComponent={
        <CustomButton
          title={"Submit Review"}
          customStyle={className("mb-10")}
          onPress={submitRating}
          loading={loading}
          disabled={loading}
        />
      }
    >
      <ServiceCard item={detail?.service} isPast isCompleted isOrder />
      <CustomText
        alignSelf={"center"}
        label={"How was your experience?"}
        fontFamily={fonts.bold}
        fontSize={16}
        marginTop={40}
      />
      <CustomText
        alignSelf={"center"}
        label={"Your overall rating"}
        fontFamily={fonts.medium}
        fontSize={12}
        marginTop={5}
        color={colors.grey}
        marginBottom={10}
      />
      <StarRating rating={rating} setRating={setRating} />
      <CustomInput
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        withLabel={"Add Detailed feedback for service provider"}
        marginTop={20}
        placeholder={"Type here..."}
        containerStyle={className("h-30")}
        textAlignVertical={"top"}
        multiline
      />
    </Layout>
  );
};

export default Review;

const styles = StyleSheet.create({});
