import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../utils/colors";
import CustomText from "./CustomText";
import Icons from "./Icons";
import fonts from "../assets/fonts";
import { ToastMessage } from "../utils/ToastMessage";

export const DatePicker = ({
  date,
  placeHolder,
  show,
  showDatepicker,
  onChange,
  maxDate,
  minDate,
  disable,
  customeStyle,
  error,
  mode = "date",
}) => {
  const isError =
    error !== undefined && error !== null && error !== true && error !== "";

  return (
    <>
      <TouchableOpacity
        onPress={showDatepicker}
        style={[
          styles.box,
          {
            borderColor: isError ? colors.red : colors.lightGrey,
            marginBottom: isError ? 2 : 15,
          },
          customeStyle,
        ]}
        disabled={disable}
      >
        <CustomText
          label={date || placeHolder}
          fontFamily={date ? fonts.medium : fonts.regular}
          color={date ? colors.black : colors.placeHolder}
          fontSize={14}
        />
        <Icons
          name={mode == "date" ? "calendar" : "time-outline"}
          family={mode == "date" ? "EvilIcons" : "Ionicons"}
          size={mode == "date" ? 25 : 20}
          color={colors.grey}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          onChange={onChange}
          minimumDate={minDate ? minDate : null}
          maximumDate={maxDate ? maxDate : null}
          mode={mode}
          display="spinner"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.grey1,
  },
  box: {
    borderColor: "#D0D5DD",
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 2,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "space-between",
    height: 52,
    backgroundColor: colors.mainBg,
  },
});
