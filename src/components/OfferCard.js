import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Images } from "../assets/images";
import { className } from "../global-styles";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { colors } from "../utils/colors";

const OfferCard = () => {
  return (
    <ImageBackground
      source={Images.banner}
      style={className("h-45")}
      imageStyle={className("rounded-6")}
    >
      <View style={className("p-6")}>
        <CustomText
          label={"25% OFF"}
          fontFamily={fonts.bold}
          color={colors.white}
          fontSize={24}
        />
        <CustomText
          label={`Get discount for every \norder, only valid for today.`}
          fontFamily={fonts.medium}
          color={colors.white}
          fontSize={14}
          marginTop={4}
        />
        <View
          style={className(
            "bg-grey p-2 w-28 rounded-4 mt-4 align-center justify-center"
          )}
        >
          <CustomText
            label={"Get Discount"}
            fontFamily={fonts.bold}
            color={colors.blk2}
            fontSize={14}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default OfferCard;

const styles = StyleSheet.create({});
