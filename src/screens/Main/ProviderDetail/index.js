import {
  FlatList,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import CustomHeader from "../../../components/CustomHeader";
import CustomText from "../../../components/CustomText";
import { Images } from "../../../assets/images";
import Icons from "../../../components/Icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton";
import { useSelector } from "react-redux";

const ProviderDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { detail } = route.params || {};
  const categories = useSelector((state) => state?.categories?.categories);
  const name = categories?.filter((category) => category?._id == detail?.cat);
  return (
    <Layout
      isSafeAreaView={true}
      showNavBar={false}
      barStyle="light-centent"
      translucent
      isScroll
      StatusBarBg="transparent"
      layoutContainer={{ paddingHorizontal: 0 }}
      footerComponent={
        <CustomButton
          title={"Schedule Booking"}
          customStyle={className("mx-5 mb-4 w-90")}
          onPress={() => navigation.navigate("BookingForm", { detail: detail })}
        />
      }
    >
      <ImageBackground
        source={detail?.images ? { uri: detail?.images[0] } : Images.detail_img}
        style={{ height: 250 }}
        imageStyle={{ objectFit: "fill" }}
      >
        <View style={styles.overlay} />
        <View style={className("flex align-center justify-between mt-10 mx-6")}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Icons
              family={"AntDesign"}
              color={colors.white}
              size={22}
              name={"arrowleft"}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={className("mt-7 mx-6")}>
        <View
          style={[
            className("bg-lightGreen p-1 px-2 rounded-1 mb-2 "),
            { alignSelf: "flex-start" },
          ]}
        >
          <CustomText
            label={detail?.cat?.name || name[0]?.name}
            fontSize={12}
            color={colors.headLine}
            fontFamily={fonts.semiBold}
          />
        </View>

        <View style={className("flex  align-center justify-between")}>
          <CustomText
            label={detail?.title}
            fontSize={16}
            color={colors.black}
            fontFamily={fonts.bold}
          />
          <CustomText
            label={`$${detail?.price}`}
            fontSize={16}
            color={colors.black}
            fontFamily={fonts.bold}
          />
        </View>
        <View style={className(" flex mt-2")}>
          <Icons
            family={"AntDesign"}
            name={"star"}
            color={colors.yellow}
            size={15}
          />
          <CustomText
            label={`${detail?.rating?.toFixed(1)}  (${detail?.totalRating})`}
            fontSize={12}
            color={colors.black}
            marginLeft={2}
          />
        </View>

        <CustomText
          label={"Description"}
          fontSize={16}
          color={colors.black}
          fontFamily={fonts.bold}
          marginTop={10}
        />
        <CustomText
          label={detail?.description}
          fontSize={13}
          fontFamily={fonts.medium}
          color={colors.second_black}
          marginBottom={8}
          marginTop={6}
        />
        <CustomText
          label={"Work Duration"}
          fontSize={16}
          color={colors.black}
          fontFamily={fonts.bold}
          marginTop={10}
        />
        <CustomText
          label={`Max ${detail?.duration} hrs`}
          fontSize={13}
          fontFamily={fonts.medium}
          color={colors.second_black}
          marginBottom={8}
          marginTop={6}
        />
        <CustomText
          label={"Location"}
          fontSize={16}
          color={colors.black}
          fontFamily={fonts.bold}
          marginTop={10}
        />
        <CustomText
          label={detail?.address}
          fontSize={13}
          fontFamily={fonts.medium}
          color={colors.second_black}
          marginBottom={8}
          marginTop={6}
        />
      </View>
    </Layout>
  );
};

export default ProviderDetail;
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire ImageBackground
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
  },
});
