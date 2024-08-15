import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { colors } from "../../../utils/colors";
import { className } from "../../../global-styles";
import { Date, Service } from "../../../assets/images";

const EventDetail = () => {
  return (
    <View style={className(" flex-1 bor-b-1 border-grey1  py-5")}>
      <CustomText
        label={"Your Events"}
        fontSize={14}
        fontFamily={fonts.bold}
        color={colors.grey}
        marginBottom={12}
      />
      <View style={className("flex align-center justify-between ")}>
        <View style={className("flex align-center")}>
          <Service />
          <CustomText
            label={"Services"}
            fontSize={14}
            fontFamily={fonts.medium}
            color={colors.blk2}
            marginLeft={4}
          />
        </View>

        <CustomText
          label={"Standard"}
          fontSize={14}
          fontFamily={fonts.bold}
          color={colors.blk2}
        />
      </View>
      <View style={className("flex align-center justify-between my-4")}>
        <View style={className("flex align-center")}>
          <Date />
          <CustomText
            label={"Dates"}
            fontSize={14}
            fontFamily={fonts.medium}
            color={colors.blk2}
            marginLeft={4}
          />
        </View>

        <CustomText
          label={"Wed,27 Nov 2024"}
          fontSize={14}
          fontFamily={fonts.bold}
          color={colors.blk2}
        />
      </View>
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({});
