import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../utils/colors";
const Loader = ({ type = "dot", color }) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator
        color={color || colors.primaryColor}
        size="large"
        animating
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.mainBg,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Loader;
