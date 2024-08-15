import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { className } from "../global-styles";
import { Images } from "../assets/images";
import CustomText from "./CustomText";
import { colors } from "../utils/colors";

const CategoryCard = ({ img, title, onPress }) => {
  return (
    <TouchableOpacity
      style={className("align-center pr-4 py-4 justify-center")}
      onPress={onPress}
    >
      <Image
        source={{ uri: img }}
        style={className("h-14 w-14 rounded-7 bor-3 border-pm")}
        resizeMode="contain"
      />

      <CustomText
        label={title}
        color={colors.blk2}
        fontSize={14}
        marginTop={4}
        alignSelf={"center"}
      />
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
