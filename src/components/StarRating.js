import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icons from "./Icons";
import { colors } from "../utils/colors";

const StarRating = ({ maxStars = 5, rating, setRating }) => {
  return (
    <View style={styles.starContainer}>
      {Array?.from({ length: maxStars }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setRating(index + 1)}
          style={styles.starButton}
        >
          <Icons
            name={index < rating ? "star" : "staro"}
            family={"AntDesign"}
            size={30}
            color={colors.yellow}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  starButton: {
    paddingHorizontal: 5,
  },
});

export default StarRating;
