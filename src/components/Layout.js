/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { className } from "../global-styles";
import Header from "./Header";
import { colors } from "../utils/colors";

const FocusAwareStatusBar = (props) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};

export const Layout = ({
  children,
  title,
  translucent = false,
  StatusBarBg = colors.mainBg,
  showNavBar = true,
  isSafeAreaView = true,
  containerStyle = {},
  barStyle = "dark-content",
  animated = false,
  hideBar = false,
  layoutContainer,
  isScroll = true,
  footerComponent,

  isHome,
  iconColor,
  customArrow,
  customNoti,
  showNoti = false,
  customHeader,
  bgColor,
}) => {
  //

  const Warp = isSafeAreaView ? SafeAreaView : View;
  const LayoutWrapper = isScroll ? KeyboardAwareScrollView : View;

  return (
    <Warp style={[className("flex-1 bg-mainBg"), containerStyle]}>
      <FocusAwareStatusBar
        translucent={translucent}
        backgroundColor={StatusBarBg}
        barStyle={barStyle}
        animated={animated}
        hidden={hideBar}
      />
      {showNavBar && (
        <Header
          isHome={isHome}
          title={title}
          iconColor={iconColor}
          customArrow={customArrow}
          customNoti={customNoti}
          showNoti={showNoti}
          customHeader={customHeader}
          bgColor={bgColor}
        />
      )}

      <LayoutWrapper
        style={[{ flex: 1, paddingHorizontal: 22 }, layoutContainer]}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>{children}</View>
        {footerComponent}
      </LayoutWrapper>
    </Warp>
  );
};
export default Layout;
