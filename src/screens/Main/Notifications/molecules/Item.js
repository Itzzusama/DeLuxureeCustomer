import { StyleSheet, View, Image } from "react-native";
import React from "react";

import CustomText from "../../../../components/CustomText";

import { colors } from "../../../../utils/colors";
import fonts from "../../../../assets/fonts";

const Item = ({ source, title, description, time }) => {
  return (
    <View style={styles.mainContainer}>
      <Image source={source} style={styles.image} resizeMode="contain" />

      <View style={{ width: "82%" }}>
        <View style={styles.container}>
          <CustomText label={title} fontFamily={fonts.medium} />
          <CustomText
            label={time}
            marginTop={10}
            fontSize={12}
            color={colors.authText}
          />
        </View>
        <CustomText label={description} fontSize={12} color={colors.authText} />
      </View>
    </View>
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
