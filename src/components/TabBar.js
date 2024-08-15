/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { useSelector } from "react-redux";

const Tab = ({ tab, setTab, isMap }) => {
  const cat = useSelector((state) => state?.categories?.categories);
  const cateogories = ["All Services", ...cat.map((item) => item.name)];

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={cateogories}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setTab(item)}
            activeOpacity={0.8}
            style={[
              styles.item,
              {
                backgroundColor:
                  tab === item
                    ? isMap
                      ? colors.primaryColor
                      : "#97C7B71A"
                    : "#F6F8FA",
                marginLeft: 15,
                marginRight: index === cateogories.length - 1 ? 15 : 0,
              },
            ]}
          >
            <CustomText
              textTransform="capitalize"
              fontFamily={fonts.semiBold}
              label={item}
              color={
                tab === item
                  ? isMap
                    ? colors.white
                    : colors.headLine
                  : colors.grey
              }
              fontSize={14}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 8,
  },
  item: {
    flex: 1,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    paddingHorizontal: 12,
  },
});
