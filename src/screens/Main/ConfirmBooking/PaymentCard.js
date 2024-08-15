import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import { Images, Next } from "../../../assets/images";

const PaymentCard = () => {
  return (
    <View>
      <CustomText
        label={"Payment Method"}
        fontSize={16}
        fontFamily={fonts.bold}
        color={colors.blk2}
        marginTop={20}
      />
      <View
        style={className(
          "bor-1 flex align-center justify-between border-grey1 rounded-4 p-4 px-3 mt-4"
        )}
      >
        <View style={className("flex align-center ")}>
          <Image source={Images.card} style={className("h-12 w-12 mr-4")} />
          <View>
            <CustomText
              label={"Master Card"}
              fontSize={14}
              fontFamily={fonts.medium}
              color={colors.blk2}
            />
            <CustomText
              label={"***** 123"}
              fontSize={12}
              fontFamily={fonts.medium}
              color={colors.grey}
            />
          </View>
        </View>
        {/* <TouchableOpacity>
          <Next />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({});
