import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import fonts from "../../assets/fonts";
import { colors } from "../../utils/colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { className } from "../../global-styles";

const Slider = ({ multiSliderValue, multiSliderValuesChange }) => {
  return (
    <View>
      <View style={className("flex align-center justify-between")}>
        <CustomText
          label={`Price Range`}
          fontFamily={fonts.semiBold}
          fontSize={18}
          marginTop={20}
        />
        <CustomText
          label={`$${multiSliderValue[0]} - $${multiSliderValue[1]}`}
          fontFamily={fonts.semiBold}
          fontSize={14}
          marginTop={20}
          color={colors.headLine}
        />
      </View>
      <View style={styles.sliderContainer}>
        <MultiSlider
          values={[multiSliderValue[0], multiSliderValue[1]]}
          sliderLength={320}
          onValuesChange={multiSliderValuesChange}
          min={multiSliderValue[0]}
          max={multiSliderValue[1]}
          step={5}
          selectedStyle={{
            backgroundColor: colors.headLine,
          }}
          unselectedStyle={{
            backgroundColor: colors.lightGrey,
          }}
          trackStyle={{
            height: 4,
          }}
          markerStyle={{
            height: 15,
            width: 15,
            borderRadius: 10,
            backgroundColor: colors.primaryColor,
          }}
        />
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  rangeSlider: {
    width: "100%",
    height: 40,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10, // Change to 10 to match thumb size
    backgroundColor: colors.primaryColor,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.lightGrey,
  },
  railSelected: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primaryColor,
  },
  label: {
    alignItems: "center",
    padding: 4,
    borderRadius: 4,
    backgroundColor: colors.primaryColor,
  },
  labelText: {
    fontSize: 14,
    color: colors.white,
  },
});
