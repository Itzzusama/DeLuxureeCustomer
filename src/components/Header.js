import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import { className } from "../global-styles";
import { colors } from "../utils/colors";
import CustomText from "./CustomText";
import Icons from "./Icons";
import { useSelector } from "react-redux";

const Header = ({
  isHome,
  title,
  iconColor,
  customArrow,
  customNoti,
  showNoti = false,
  customHeader,
  bgColor,
}) => {
  //
  const unseen = useSelector((state) => state.noti.noti);
  const user = useSelector((state) => state.user.loginUser);
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  return (
    <View
      style={[
        className("flex h-18 bg-mainBg align-center px-5 justify-between"),
        {
          backgroundColor: colors.mainBg || bgColor,
        },
      ]}
    >
      {isHome ? (
        <Image
          source={
            user?.profilePicture ? { uri: user?.profilePicture } : Images.user
          }
          style={styles.avatar}
        />
      ) : (
        <TouchableOpacity
          style={[styles.arrowBtn, customArrow]}
          onPress={() => (navigation?.canGoBack() ? navigation.goBack() : "")}
        >
          <Icons
            name="arrowleft"
            color={colors.black || iconColor}
            size={20}
            family={"AntDesign"}
          />
        </TouchableOpacity>
      )}

      <View style={className("flex-1")}>
        {title && (
          <CustomText
            label={title}
            alignSelf={"center"}
            fontFamily={fonts.bold}
            fontSize={18}
          />
        )}
        {customHeader && <View>{customHeader}</View>}
      </View>
      {showNoti ? (
        <View style={[styles.notiBg, customNoti]}>
          {unseen > 0 && (
            <View
              style={[
                className(" align-center justify-center rounded-2 h-1.5 w-1.5"),
                {
                  right: 11,
                  bottom: 22,
                  position: "absolute",
                  zIndex: 10000,
                  backgroundColor: colors.red,
                },
              ]}
            />
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image source={Images.noti} style={styles.noti} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={className("w-3")} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: colors.mainBg,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "center",
  },
  noti: {
    width: 19,
    height: 19,
    resizeMode: "contain",
  },
  notiBg: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    borderColor: "#ECEFF3",
    borderWidth: 1,
  },
  arrowBtn: {
    backgroundColor: "#97C7B71A",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  avatar: {
    height: 38,
    width: 38,
    borderRadius: 40,
  },
});
