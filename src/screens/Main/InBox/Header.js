import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import CustomText from "../../../components/CustomText";

import Icons from "../../../components/Icons";

import fonts from "../../../assets/fonts";
import { colors } from "../../../utils/colors";

const Header = ({ title, marginBottom, rightPress, source, desc }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.mainContainer, { marginBottom }]}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.goBack()}
        style={styles.firstContainer}
      >
        <Icons
          family="AntDesign"
          name="arrowleft"
          size={22}
          color={colors.black}
        />
      </TouchableOpacity>
      <View style={styles.secondContainer}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 100,
            backgroundColor: colors.lightGrey,
            padding: 2,
            marginRight: 10,
          }}
        >
          <Image resizeMode="cover" source={source} style={styles.userImage} />
        </View>
        <View>
          <CustomText label={title} fontFamily={fonts.bold} />
          <CustomText label={desc} fontSize={12} fontFamily={fonts.medium} />
        </View>
      </View>
      <View style={styles.thirdContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={rightPress}>
          <Icons
            family="Entypo"
            name="dots-three-horizontal"
            color={colors.primaryColor}
            size={22}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    backgroundColor: colors.white,
  },
  firstContainer: {
    width: "12%",
  },
  secondContainer: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  thirdContainer: {
    alignItems: "flex-end",
    width: "18%",
    paddingRight: 10,
  },
});
