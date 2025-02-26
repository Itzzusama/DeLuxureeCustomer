import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Images } from "../assets/images";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { className } from "../global-styles";
import { colors } from "../utils/colors";
import { useSelector } from "react-redux";

const ProfileHeader = ({ name, email, img }) => {
  const userData = useSelector((state) => state?.user?.loginUser);
  return (
    <View style={className("flex align-center")}>
      <Image
        source={
          userData?.profilePicture
            ? { uri: userData?.profilePicture }
            : Images.user
        }
        style={[styles.avatar]}
      />
      <View>
        {userData?.name && (
          <CustomText
            label={userData?.name}
            fontSize={18}
            color={colors.black}
            fontFamily={fonts.semiBold}
          />
        )}

        <CustomText label={userData?.email} fontSize={14} color={colors.grey} />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  avatar: {
    height: 42,
    width: 42,
    resizeMode: "contain",
    borderRadius: 30,
    marginRight: 12,
  },
});
