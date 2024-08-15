import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import fonts from "../assets/fonts";

const NoDataFound = ({ title, marginTop, title2, source }) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        style={[styles.image, { marginTop: marginTop || 100 }]}
        source={source}
      />
      <CustomText
        label={title || "noDataFound"}
        fontFamily={fonts.bold}
        fontSize={18}
        textAlign="center"
        marginTop={5}
      />
      {title2 && (
        <CustomText
          label={title2 || "noDataFound"}
          fontFamily={fonts.medium}
          fontSize={14}
          textAlign="center"
          marginTop={5}
        />
      )}
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    //height: 200,
    width: Dimensions.get("window").width - 40,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
});
