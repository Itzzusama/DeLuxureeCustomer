import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { className } from "../global-styles";
import CustomText from "./CustomText";
import { Images } from "../assets/images";
import { colors } from "../utils/colors";
import fonts from "../assets/fonts";
import { useSelector } from "react-redux";

const CustomHeader = ({ customStyle, title, des, isChat }) => {
  const userData = useSelector((state) => state?.user?.loginUser);
  return (
    <View style={className("align-center ")}>
      <View style={className("flex align-center")}>
        {isChat && <Image source={Images.user} style={[styles.avatar]} />}
        <View style={className(isChat ? "" : "align-center")}>
          <CustomText
            label={title}
            fontSize={14}
            color={isChat ? colors.black : colors.grey}
            fontFamily={isChat ? fonts.bold : fonts.regular}
          />

          {/* <View style={className("flex")}>
            {!isChat && (
              <Image
                source={Images.pin}
                style={[styles.imgStyle, customStyle]}
              />
            )}

            <CustomText
              label={des || "Brooklyn, New York"}
              fontSize={isChat ? 12 : 14}
              fontFamily={fonts.semiBold}
              color={isChat ? colors.grey : colors.black}
            />
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  imgStyle: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    tintColor: colors.primaryColor,
  },
  avatar: {
    height: 42,
    width: 42,
    resizeMode: "contain",
    borderRadius: 30,
    marginRight: 12,
  },
});
