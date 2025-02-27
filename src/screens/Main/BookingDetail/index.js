import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import ProfileHeader from "../../../components/ProfileHeader";
import CustomButton from "../../../components/CustomButton";
import {
  Help,
  History,
  Images,
  Lock,
  Next,
  Person,
  Security,
} from "../../../assets/images";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import ProviderComponent from "./ProviderComponent";
import { formatDate, formatTime } from "../../../utils/dateUtils";
const BookingDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderDetail } = route.params || {};

  const color =
    orderDetail?.status === "completed"
      ? colors.green
      : orderDetail?.status === "cancelled"
      ? colors.red
      : orderDetail?.status === "pending"
      ? colors.primaryColor
      : "orange";
  const handleNavigation = async () => {
    const dataToSend = {
      id: orderDetail?.to_id?._id,
      img: orderDetail?.to_id?.profilePicture,
      name: orderDetail?.to_id?.name,
      type: orderDetail?.to_id?.type,
    };
    navigation.navigate("InBox", { data: dataToSend });
  };
  return (
    <Layout title={"Detail"} isScroll>
      <View style={className("bor-1 border-grey1 rounded-2 p-2 px-3")}>
        <View style={className("flex")}>
          <Image
            source={
              orderDetail?.service
                ? { uri: orderDetail?.service?.images[0] }
                : Images.detail_img
            }
            style={styles.img}
          />
          <View style={className("ml-2")}>
            <CustomText
              label={orderDetail?.service?.title}
              fontSize={14}
              color={colors.black}
              fontFamily={fonts.bold}
            />
            <View style={className(" flex")}>
              <Icons
                family={"AntDesign"}
                name={"star"}
                color={colors.yellow}
                size={15}
              />
              <CustomText
                label={orderDetail?.service?.rating.toFixed(1)}
                fontSize={12}
                color={colors.second_black}
                marginLeft={2}
              />
            </View>
          </View>
        </View>

        <View
          style={className(
            "flex flex-1 align-center justify-between border-grey bor-b-1 pb-4"
          )}
        >
          <View>
            <View style={className("my-2 mt-5")}>
              <CustomText
                label={"Booking Date"}
                fontSize={12}
                fontFamily={fonts.medium}
                color={colors.second_black}
              />
              <CustomText
                label={formatDate(orderDetail?.date)}
                fontSize={12}
                fontFamily={fonts.bold}
                color={colors.black}
                marginTop={3}
              />
            </View>

            <View style={className("my-2")}>
              <CustomText
                label={"Worker"}
                fontSize={12}
                fontFamily={fonts.medium}
                color={colors.second_black}
              />
              <CustomText
                label={
                  orderDetail?.status == "accepted" ||
                  orderDetail?.status == "completed"
                    ? `Mr. ${orderDetail?.to_id?.name}`
                    : "N/A"
                }
                fontSize={12}
                fontFamily={fonts.bold}
                color={colors.black}
                marginTop={3}
                textTransform={"capitalize"}
              />
            </View>
          </View>
          <View>
            <View style={className("my-2 mt-5")}>
              <CustomText
                label={"Booking Time"}
                fontSize={12}
                fontFamily={fonts.medium}
                color={colors.second_black}
              />
              <CustomText
                label={formatTime(orderDetail?.time)}
                fontSize={12}
                fontFamily={fonts.bold}
                color={colors.black}
                marginTop={3}
              />
            </View>
            <View style={className("my-2 ")}>
              <CustomText
                label={"Status"}
                fontSize={12}
                fontFamily={fonts.medium}
                color={colors.second_black}
              />
              <CustomText
                label={orderDetail?.status}
                fontSize={12}
                fontFamily={fonts.bold}
                color={color}
                marginTop={3}
                textTransform={"capitalize"}
              />
            </View>
          </View>
        </View>

        <View style={className(" flex-1  border-grey bor-b-1 py-5")}>
          <View style={className("flex align-center justify-between")}>
            <CustomText
              label={"Price"}
              fontSize={14}
              fontFamily={fonts.medium}
              color={colors.blk2}
            />
            <CustomText
              label={`$${orderDetail?.service?.price}`}
              fontSize={14}
              fontFamily={fonts.medium}
              color={colors.blk2}
            />
          </View>
          <View
            style={className("flex align-center justify-between my-4")}
          ></View>
          <View style={className("flex align-center justify-between")}>
            <CustomText
              label={"Total"}
              fontSize={14}
              fontFamily={fonts.bold}
              color={colors.blk2}
            />
            <CustomText
              label={`$${orderDetail?.service?.price}`}
              fontSize={14}
              fontFamily={fonts.bold}
              color={colors.blk2}
            />
          </View>
        </View>

        <View style={className("mt-5")}>
          <View style={className("flex align-center justify-between")}>
            <CustomText
              label={"Review for Service Provider"}
              fontSize={14.63}
              color={colors.black}
              fontFamily={fonts.bold}
            />
            {orderDetail?.status == "completed" && orderDetail.rating == 0 && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Review", { detail: orderDetail });
                }}
              >
                <Next />
              </TouchableOpacity>
            )}
          </View>

          <View style={className(" flex mt-1 mb-2")}>
            <Icons
              family={"AntDesign"}
              name={"star"}
              color={colors.yellow}
              size={15}
            />
            <CustomText
              label={orderDetail?.service?.rating.toFixed(1)}
              fontSize={12}
              color={colors.second_black}
              marginLeft={2}
            />
          </View>
          <CustomText
            label={
              "Delivered exceptional cleaning services tailored to your specific needs."
            }
            fontSize={13}
            fontFamily={fonts.medium}
            color={colors.second_black}
            marginBottom={8}
          />
        </View>
      </View>
      {(orderDetail?.status == "accepted" ||
        orderDetail?.status == "completed" ||
        orderDetail?.status == "complete_request") && (
        <ProviderComponent
          provider_detail={orderDetail?.to_id}
          bookingDate={orderDetail?.date}
          bookingTime={orderDetail?.time}
          service_des={orderDetail?.service?.description}
          handleNavigation={handleNavigation}
        />
      )}
    </Layout>
  );
};

export default BookingDetail;
const styles = StyleSheet.create({
  img: {
    height: 60,
    width: 60,
    borderRadius: 8,
  },
});
