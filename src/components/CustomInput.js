/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CustomText from "./CustomText";

import fonts from "../assets/fonts";
import { colors } from "../utils/colors";
import Icons from "./Icons";

const CustomInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText = () => "",
  onBlur = () => "",
  keyboardType = "default",
  multiline,
  maxLength,
  placeholderTextColor,
  editable,
  textAlignVertical,
  autoCapitalize,
  error,
  isFocus,
  isBlur,
  onEndEditing,
  autoFocus,
  ref,
  marginTop,
  withLabel,
  containerStyle,
  inputStyle,
  showLoader,
}) => {
  //
  const isError =
    error !== undefined && error !== null && error !== true && error !== "";

  const [isFocused, setIsFocused] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
    isFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    isBlur?.();
  };

  return (
    <>
      {withLabel && (
        <CustomText
          label={withLabel}
          marginBottom={8}
          fontSize={14}
          fontFamily={fonts.semiBold}
          color={colors.black}
          marginTop={marginTop}
        />
      )}
      <View
        style={[
          styles.mainContainer,
          {
            marginBottom: isError ? 2 : 15,
            borderColor: isError
              ? colors.red
              : isFocused
              ? colors.primaryColor
              : colors.lightGrey,
          },
          containerStyle,
        ]}
      >
        <TextInput
          ref={ref}
          placeholder={placeholder}
          style={[styles.input, inputStyle]}
          secureTextEntry={secureTextEntry ? (hidePass ? true : false) : false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          onEndEditing={onEndEditing}
          maxLength={maxLength}
          placeholderTextColor={placeholderTextColor || colors.placeHolder}
          editable={editable}
          textAlignVertical={multiline ? "top" : textAlignVertical}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          cursorColor={colors.primaryColor}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => setHidePass(!hidePass)}
          >
            <Icons
              name={!hidePass ? "eye" : "eye-off"}
              color={colors.black}
              size={18}
              family="Feather"
            />
          </TouchableOpacity>
        )}
        {showLoader && (
          <ActivityIndicator color={colors.primaryColor} size={"small"} />
        )}
      </View>
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    paddingHorizontal: 15,
    borderWidth: 1,
    height: 52,
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
  },
  input: {
    padding: 0,
    margin: 0,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.black,
    flex: 1,
  },
  iconBox: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});
