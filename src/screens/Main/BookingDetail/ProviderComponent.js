import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { className } from "../../../global-styles";
import { Images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import ChatIcon from "../../../assets/images/chatIcon";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../../assets/fonts";
import { colors } from "../../../utils/colors";
import Icons from "../../../components/Icons";
import { formatDate, formatTime } from "../../../utils/dateUtils";

const ProviderComponent = ({
  provider_detail,
  bookingDate,
  bookingTime,
  service_des,
  handleNavigation,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[className("bg-white rounded-2 p-1 px-3 my-5"), styles.shadow]}
    >
      <View style={[className("flex justify-between align-center my-4")]}>
        <View>
          <CustomText
            label={provider_detail?.name}
            fontSize={14}
            fontFamily={fonts.semiBold}
          />
          <CustomText
            label={provider_detail?.email}
            fontSize={10}
            fontFamily={fonts.medium}
            color={colors.grey}
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <ChatIcon />
        </TouchableOpacity>
      </View>

      <View
        style={[
          className(
            "flex justify-between align-center p-4 rounded-2 bg-lightGreen flex-1"
          ),
        ]}
      >
        <View style={className("flex align-center")}>
          <Icons
            family={"AntDesign"}
            name={"calendar"}
            size={14}
            color={colors.blk2}
          />
          <CustomText
            label={formatDate(bookingDate)}
            color={colors.blk2}
            fontSize={10}
            fontFamily={fonts.medium}
            marginLeft={4}
          />
        </View>
        <View style={className("flex align-center")}>
          <Icons
            family={"Ionicons"}
            name={"time-outline"}
            size={14}
            color={colors.blk2}
          />
          <CustomText
            label={formatTime(bookingTime)}
            color={colors.blk2}
            fontSize={10}
            fontFamily={fonts.medium}
            marginLeft={4}
          />
        </View>
      </View>

      {/* <CustomText
        label={"Address"}
        fontSize={14}
        fontFamily={fonts.bold}
        color={colors.blk2}
        marginTop={10}
        marginBottom={3}
      />
      <CustomText
        label={"5th avenue, apartment 456, New York, USA"}
        fontSize={13}
        fontFamily={fonts.medium}
        color={colors.second_black}
        marginBottom={8}
      /> */}
      <CustomText
        label={"Detail"}
        fontSize={14}
        fontFamily={fonts.bold}
        color={colors.blk2}
        marginBottom={3}
        marginTop={12}
      />
      <CustomText
        label={service_des}
        fontSize={13}
        fontFamily={fonts.medium}
        color={colors.second_black}
        marginBottom={14}
      />
    </View>
  );
};

export default ProviderComponent;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Offset for shadow for iOS
    shadowOpacity: 0.1, // Opacity for shadow for iOS
    shadowRadius: 3.84, // Radius for shadow for iOS
    elevation: 1, // Elevation for shadow for Android
  },
  log: {
    height: 65,
    width: 65,
  },
});
