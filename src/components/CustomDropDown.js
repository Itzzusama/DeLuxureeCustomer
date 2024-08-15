import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  ScrollView,
  UIManager,
} from "react-native";
import Icons from "./Icons";
import CustomText from "./CustomText";
import { colors } from "../utils/colors";
import fonts from "../assets/fonts";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomDropdown = ({ data, value, setValue, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (option?._id) {
      setValue(option?._id);
      setText(option.title);
    } else {
      setValue(option);
    }
    setIsOpen(false);
  };
  const isError =
    error !== undefined && error !== null && error !== true && error !== "";

  return (
    <>
      <View
        style={[
          styles.dropdownMainContainer,
          {
            marginBottom: isError ? 2 : 15,
            borderColor: isError ? colors.red : colors.lightGrey,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.container}
          onPress={toggleDropdown}
        >
          <CustomText
            label={text || value || placeholder}
            fontSize={15}
            fontFamily={fonts.semiBold}
            color={value?.length ? colors.black : colors.authText}
            paddingHorizontal={10}
          />
          <Icons
            style={{ color: colors.black }}
            family="Feather"
            size={25}
            name={isOpen ? "chevron-up" : "chevron-down"}
          />
        </TouchableOpacity>
        {isOpen && data?.length > 0 && (
          <ScrollView
            scrollEnabled
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {data?.map((option, i) => (
              <TouchableOpacity
                style={styles.list}
                key={i}
                onPress={() => selectOption(option)}
              >
                <CustomText
                  label={option?._id ? option?.title : option}
                  fontSize={13}
                  color={colors.black}
                  fontFamily={fonts.semiBold}
                />
                {/* {option?._id && (
                  <CustomText
                    label={"$" + option?._id}
                    fontSize={13}
                    color={colors.black}
                    fontFamily={fonts.semiBold}
                  />
                )} */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default CustomDropdown;
const styles = StyleSheet.create({
  dropdownMainContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    width: "100%",
    maxHeight: 200,
    overflow: "scroll",
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "100%",
    height: 49,
    backgroundColor: colors.white,
    overflow: "scroll",
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily: fonts.medium,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
