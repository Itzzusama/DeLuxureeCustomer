import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Swiper from "react-native-swiper";
import CustomText from "../../../components/CustomText";
import Layout from "../../../components/Layout";
// import ProgressCircle from '../../../components/ProgressCircle';
import { className } from "../../../global-styles";
import { colors } from "../../../utils/colors";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import fonts from "../../../assets/fonts";
import { ArrowBtn, Images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";

const Intro = () => {
  //
  const dots = [];
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  const handleSlideChange = (index) => {
    setImageIndex(index);
    setProgress(index + 1);
  };

  const handleButtonPress = () => {
    if (imageIndex === 2) {
      navigation.replace("GetStarted");
    } else {
      swiperRef.current.scrollBy(1);
    }
  };

  const haveSeen = async () => {
    try {
      await AsyncStorage.setItem("intro_has_seen", "intro_seen");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    haveSeen();
  }, []);

  return (
    <Layout
      isSafeAreaView={true}
      showNavBar={false}
      translucent
      isScroll={false}
      StatusBarBg="transparent"
      layoutContainer={{ paddingHorizontal: 0 }}
    >
      <View style={className("bg-pm flex-1")}>
        <Swiper
          loop={false}
          index={imageIndex}
          onIndexChanged={handleSlideChange}
          ref={swiperRef}
          renderPagination={(index, total) => {
            for (let i = 0; i < total; i++) {
              dots.push(
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === index ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              );
            }
          }}
        >
          {/* Iterate through images */}

          <View style={className("align-center flex-1  justify-end ")}>
            {/* <Onbord1 /> */}
            <ImageBackground source={Images.intro1} style={styles.img} />
          </View>

          <View style={className("align-center flex-1  justify-end ")}>
            {/* <Onbord2 /> */}
            <ImageBackground source={Images.intro2} style={styles.img} />
          </View>

          <View style={className("align-center flex-1  justify-end ")}>
            <ImageBackground source={Images.intro3} style={styles.img} />
          </View>
        </Swiper>

        {imageIndex === 0 && (
          <View
            style={[
              className("bg-mainBg"),
              {
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                flex: heightPercentageToDP("0.01%"),
              },
            ]}
          >
            <CustomText
              label={" We provide professional service at a friendly price"}
              textStyle={className(
                "text-black text-24 text-semi text-center pt-10 px-4"
              )}
              alignSelf={"center"}
            />
            <CustomText
              label={
                "Equipped with the latest tools and eco-friendly products to ensure your home is spotless and inviting."
              }
              textStyle={className(
                "text-black text-14 text-hind-medi text-center pt-4 px-6"
              )}
              alignSelf={"center"}
            />
          </View>
        )}
        {imageIndex === 1 && (
          <View
            style={[
              className("bg-mainBg"),
              {
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                flex: heightPercentageToDP("0.01%"),
              },
            ]}
          >
            <CustomText
              label={"The best results and satisfaction our top priority"}
              textStyle={className(
                "text-black text-24 text-semi text-center pt-10 px-4"
              )}
              alignSelf={"center"}
            />
            <CustomText
              label={
                "One-time deep clean or regular maintenance, we guarantee meticulous attention to detail and unparalleled customer satisfaction."
              }
              textStyle={className(
                "text-black text-14 text-hind-medi text-center pt-4 px-6"
              )}
              alignSelf={"center"}
            />
          </View>
        )}
        {imageIndex === 2 && (
          <View
            style={[
              className("bg-mainBg"),
              {
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                flex: heightPercentageToDP("0.01%"),
              },
            ]}
          >
            <CustomText
              label={"Let’s make awesome changes to your home"}
              textStyle={className(
                "text-black text-24 text-semi text-center pt-10 px-4"
              )}
              alignSelf={"center"}
            />
            <CustomText
              label={
                "Your trusted partner for exceptional home cleaning services, delivering thorough and reliable cleaning solutions"
              }
              textStyle={className(
                "text-black text-14 text-hind-medi text-center pt-4 px-6"
              )}
              alignSelf={"center"}
            />
          </View>
        )}
        <View
          style={[
            className("align-center justify-center bg-mainBg flex-row h-10"),
            {},
          ]}
        >
          {dots}
        </View>
        <View
          style={className(
            "align-center justify-center flex-row bg-mainBg pb-2 px-8"
          )}
        >
          <CustomButton
            title={imageIndex == 2 ? "Get Started" : "Next"}
            onPress={handleButtonPress}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Intro;

const styles = StyleSheet.create({
  dot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: colors.primaryColor,
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  inactiveDot: {
    backgroundColor: colors.grey2,
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  img: {
    width: "100%",
    flex: 1,
  },
});
