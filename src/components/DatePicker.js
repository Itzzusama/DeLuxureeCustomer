import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import { colors } from "../utils/colors";
import CustomText from "./CustomText";
import Icons from "./Icons";
import fonts from "../assets/fonts";
import { ToastMessage } from "../utils/ToastMessage";
import CustomButton from "./CustomButton";
import { className } from "../global-styles";
import Modal from 'react-native-modal';

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
  hideDatepicker,
}) => {
  const isError =
    error !== undefined && error !== null && error !== true && error !== "";

  const [dateData, setDateData] = useState(new Date());

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
          name={mode === "date" ? "calendar" : "time-outline"}
          family={mode === "date" ? "EvilIcons" : "Ionicons"}
          size={mode === "date" ? 25 : 20}
          color={colors.grey}
        />
      </TouchableOpacity>

      {Platform.OS === "android" && show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateData}
          onChange={(event, selectedTime) => {
            hideDatepicker();
            if (selectedTime) {
              setDateData(selectedTime);
              onChange(selectedTime);
            }
          }}
          minimumDate={minDate || null}
          maximumDate={maxDate || null}
          mode={mode}
          display="spinner"
        />
      )}

      {Platform.OS === "ios" && (
        <Modal isVisible={show} animationIn="fadeIn" animationOut="fadeOut">
          <View style={{ backgroundColor: "white", borderRadius: 20 }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={dateData}
              onChange={(event, selectedTime) => setDateData(selectedTime)}
              minimumDate={minDate || null}
              maximumDate={maxDate || null}
              mode={mode}
              display="spinner"
            />
            <View style={className("flex align-center justify-evenly my-2")}>
              <CustomButton
                title={"Cancel"}
                customStyle={className("w-30 bg-grey")}
                onPress={hideDatepicker}
              />
              <CustomButton
                title={"Ok"}
                customStyle={className("w-30")}
                onPress={() => onChange(dateData)}
              />
            </View>
          </View>
        </Modal>
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
