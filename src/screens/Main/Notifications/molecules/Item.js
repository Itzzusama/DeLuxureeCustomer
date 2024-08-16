import { StyleSheet, View, Image, Pressable } from "react-native";
import React from "react";

import CustomText from "../../../../components/CustomText";

import { colors } from "../../../../utils/colors";
import fonts from "../../../../assets/fonts";
import { useNavigation } from "@react-navigation/native";

const Item = ({ source, title, description, time }) => {
  const navigation = useNavigation();
  const onPress = () => {
    if (title == "New Message") {
      navigation.navigate("HomeStack", { screen: "Chat" });
    } else if (title == "Booking accepted") {
      navigation.navigate("HomeStack", {
        screen: "Orders",
        params: {
          screen: "In-Progress",
        },
      });
    } else if (title == "Order completed. Give Rating") {
      navigation.navigate("HomeStack", {
        screen: "Account",
        params: {
          screen: "PastBooking",
          params: {
            screen: "Completed",
          },
        },
      });
    }
  };
  return (
    <Pressable style={styles.mainContainer} onPress={onPress}>
      <Image source={source} style={styles.image} resizeMode="contain" />

      <View style={{ width: "87%" }}>
        <View style={styles.container}>
          <CustomText label={title} fontFamily={fonts.medium} />
        </View>
        <CustomText label={description} fontSize={12} color={colors.authText} />
        <CustomText
          label={time}
          marginTop={10}
          fontSize={12}
          color={colors.authText}
        />
      </View>
    </Pressable>
  );
};

export default Item;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    padding: 20,
    paddingHorizontal: 1,
    borderBottomWidth: 0.5,
    borderBlockColor: colors.grey,
    flexDirection: "row",

    justifyContent: "space-between",
  },
  image: {
    width: 37,
    height: 37,
    tintColor: colors.primaryColor,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
