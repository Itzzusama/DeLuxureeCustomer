import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../components/CustomText";
import { className } from "../../../global-styles";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";

const PriceDetail = ({ price }) => {
  return (
    <View style={className(" flex-1  py-5")}>
      <CustomText
        label={"Price Details"}
        fontSize={14}
        fontFamily={fonts.bold}
        color={colors.grey}
        marginBottom={12}
      />
      <View style={className("flex align-center justify-between")}>
        <CustomText
          label={"Price"}
          fontSize={14}
          fontFamily={fonts.medium}
          color={colors.blk2}
        />
        <CustomText
          label={`$${price}`}
          fontSize={14}
          fontFamily={fonts.bold}
          color={colors.blk2}
        />
      </View>
      {/* <View style={className("flex align-center justify-between my-4")}>
        <CustomText
          label={"Service Fee"}
          fontSize={14}
          fontFamily={fonts.medium}
          color={colors.blk2}
        />
        <CustomText
          label={`$${price}`}
          fontSize={14}
          fontFamily={fonts.bold}
          color={colors.blk2}
        />
      </View> */}
      <View style={className("flex align-center justify-between")}>
        <CustomText
          label={"Total"}
          fontSize={14}
          fontFamily={fonts.bold}
          color={colors.blk2}
        />
        <CustomText
          label={`$${price}`}
          fontSize={14}
          fontFamily={fonts.bold}
          color={colors.blk2}
        />
      </View>
    </View>
  );
};

export default PriceDetail;

const styles = StyleSheet.create({});
