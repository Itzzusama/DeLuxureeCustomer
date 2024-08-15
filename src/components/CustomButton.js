import { TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import fonts from "../assets/fonts";
import { colors } from "../utils/colors";

const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
  customStyle,
  customText,
  btnColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      style={[
        styles.btn,
        { backgroundColor: disabled ? colors.disabled : colors.primaryColor },
        customStyle,
      ]}
      onPress={onPress}
    >
      {loading && <ActivityIndicator size={25} color={colors.white} />}
      {!loading && (
        <CustomText
          textStyle={customText}
          label={title}
          color={colors.white}
          fontFamily={fonts.semiBold}
          fontSize={16}
          lineHeight={22}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
  },
});
