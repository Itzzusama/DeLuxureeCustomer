import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";

import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { colors } from "../utils/colors";

const PhoneNumberInput = ({
  title,
  value,
  setValue,
  defaultValue,
  phoneInput,
  error,
  onChangeFormattedText = () => "",
  onChangeText = () => "",
  defaultCode,
  disabled = false,
  changeColor,
}) => {
  const isError =
    error !== undefined && error !== null && error !== true && error !== "";
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef();
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View
      style={[
        styles.wrapper,
        {
          marginBottom: isError ? 2 : 15,
        },
      ]}
    >
      <CustomText
        label={"Phone Number"}
        fontFamily={fonts.semiBold}
        fontSize={14}
        color={colors.black}
        marginBottom={8}
      />
      <PhoneInput
        ref={phoneInput}
        defaultValue={defaultValue}
        value={value}
        defaultCode={defaultCode || "US"}
        layout="second"
        disabled={disabled}
        placeholder={"Enter your number"}
        textInputProps={{
          placeholderTextColor: "#5E5E5E",
          onFocus: handleFocus,
          onBlur: handleBlur,
        }}
        containerStyle={[
          styles.containerStyle,
          {
            borderColor: isError
              ? colors.red
              : isFocused
              ? colors.primaryColor
              : colors.lightGrey,
          },
        ]}
        textContainerStyle={[
          styles.textContainerStyle,
          {
            borderColor: isError
              ? colors.red
              : isFocused
              ? colors.primaryColor
              : colors.lightGrey,
          },
        ]}
        textInputStyle={styles.textInputStyle}
        codeTextStyle={styles.codeTextStyle}
        onChangeText={onChangeText}
        countryPickerButtonStyle={[styles.countryPickerButtonStyle]}
        onChangeFormattedText={onChangeFormattedText}
        countryPickerProps={{ withAlphaFilter: false }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
  },

  error: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.red,
    marginTop: 3,
  },
  containerStyle: {
    backgroundColor: colors.mainBg,
    width: "100%",
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  textContainerStyle: {
    backgroundColor: colors.mainBg,
    borderLeftWidth: 1,
    borderColor: colors.lightGrey,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  textInputStyle: {
    fontFamily: fonts.medium,
    height: 52,
    borderRadius: 10,
    color: colors.black,
    fontSize: 14,
  },
  codeTextStyle: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  countryPickerButtonStyle: {
    borderRightColor: colors.lightGrey,
    alignSelf: "center",
    backgroundColor: colors.mainBg,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default PhoneNumberInput;
