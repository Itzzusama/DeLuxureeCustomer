import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";

import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";

import { Images, SplashImg } from "../../../assets/images";
import { Image, View } from "react-native";

const Splash = () => {
  //
  const navigation = useNavigation();

  const checkId = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      return value !== null;
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
      return false;
    }
  };
  const checkIntro = async () => {
    try {
      const value = await AsyncStorage.getItem("intro_has_seen");
      return value === "intro_seen";
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
      return false;
    }
  };

  const checkIsUserLogin = async () => {
    const isLogin = await checkId();
    const isSeen = await checkIntro();

    if (!isSeen) {
      navigation.replace("Intro");
    } else {
      if (isLogin) {
        navigation.reset({ index: 0, routes: [{ name: "MainStack" }] });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "AuthStack",
              state: {
                routes: [
                  {
                    name: "GetStarted",
                  },
                ],
              },
            },
          ],
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkIsUserLogin();
    }, 2000);
  }, []);

  return (
    <Layout
      isSafeAreaView={false}
      showNavBar={false}
      isScroll={false}
      containerStyle={className("bg-white")}
    >
      <View style={className("bg-white align-center flex-1 justify-center")}>
        <Image
          source={Images.logo}
          style={{ height: "70%", width: "70%" }}
          resizeMode="contain"
        />
      </View>
    </Layout>
  );
};

export default Splash;
