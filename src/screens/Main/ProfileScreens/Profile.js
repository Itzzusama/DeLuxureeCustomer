import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Image as ImageCompressor } from "react-native-compressor";
import storage from "@react-native-firebase/storage";
import { parsePhoneNumber } from "libphonenumber-js";

import CustomInput from "../../../components/CustomInput";
import Icons from "../../../components/Icons";
import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";
import { colors } from "../../../utils/colors";

import { Images } from "../../../assets/images";
import PhoneNumberInput from "../../../components/PhoneNumberInput";
import CustomButton from "../../../components/CustomButton";
import LogoutSheet from "../../../components/LogoutSheet";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { useDispatch, useSelector } from "react-redux";
import { ToastMessage } from "../../../utils/ToastMessage";
import { useNavigation } from "@react-navigation/native";
import UploadImage from "../../../components/UploadImage";
import { post, put } from "../../../services/ApiRequest";
import { getUserProfile } from "../../../store/reducer/usersSlice";
import axios from "axios";
import { endPoints } from "../../../services/ENV";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const userData = useSelector((state) => state?.user?.loginUser);
  const [sheetType, setSheetType] = useState("");
  const sheetRef = useRef(null);
  const [number, setNumber] = useState("");
  const [countryCode, setCountryCode] = useState("PK");
  const phoneInput = useRef(null);
  const [valid, setValid] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [image, setImage] = useState(userData?.profilePicture || "");
  const init = {
    fName: userData?.name,
    email: userData?.email,
  };

  const [state, setState] = useState(init);

  const handleUpdateUser = async () => {
    if (!state.fName) {
      ToastMessage("Enter your name");
      return;
    }
    setLoading(true);
    try {
      const body = {
        fcmtoken: "",
        name: state?.fName,
        email: state?.email,
        profilePicture: image,
        phone: userData.phone,
      };
      const response = await put("users/update-user", body);
      if (response.data.success) {
        dispatch(getUserProfile);
        ToastMessage(response.data?.message);
        // navigation.goBack();
      } else {
        ToastMessage(response.data?.message);
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const array = [
    {
      id: 1,
      withLable: "Full Name",
      placeholder: "enter your full name here...",
      value: state.fName,
      onChange: (text) => setState({ ...state, fName: text }),
    },

    {
      id: 2,
      withLable: "Email",
      placeholder: "enter your email address here...",
      value: state.email,
      onChange: (text) => setState({ ...state, email: text }),
      keyboardType: "email-address",
    },
  ];

  const uploadAndGetUrl = async (file) => {
    setImageLoader(true);
    const token = await AsyncStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: file.path || file.fileCopyUri || "",
        type: "image/jpeg",
        name: "photo.jpg",
      });
      const res = await axios.post(
        `${endPoints.BASE_URL}image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      setImage(res?.data?.image);
      return res?.data?.image;
    } catch (err) {
      console.log("=======er", err);
      ToastMessage("Upload Again");
    } finally {
      setImageLoader(false);
    }
  };
  useEffect(() => {
    handleParsePhoneNumber(userData?.phone);
  }, []);
  const handleParsePhoneNumber = (arg) => {
    try {
      const parsedNumber = parsePhoneNumber(arg);
      setCountryCode(parsedNumber.country);
      setNumber(parsedNumber.nationalNumber);
    } catch (error) {
      console.error("Invalid phone number:", error);
    }
  };
  return (
    <Layout title={"Profile"}>
      <View style={className(" align-center align-self")}>
        <Image
          source={image ? { uri: image } : Images.user}
          style={className("w-30 h-30 rounded-20 align-self")}
        />
        {imageLoader && (
          <View
            style={[
              className("w-30 h-30 rounded-20 align-self"),
              styles.loaderContainer,
            ]}
          >
            <ActivityIndicator size="small" color={colors.primaryColor} />
          </View>
        )}
        <UploadImage
          handleChange={async (res) => {
            const url = await uploadAndGetUrl(res);
          }}
          renderButton={(res) => (
            <TouchableOpacity onPress={res} style={styles.btn}>
              <Icons
                name={"edit"}
                family={"MaterialIcons"}
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={className("mt-10")}>
        {array.map((item) => (
          <CustomInput
            withLabel={item?.withLable}
            key={item?.id}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            editable={item?.id !== 2}
            keyboardType={item?.keyboardType}
          />
        ))}

        {number && (
          <PhoneNumberInput
            phoneInput={phoneInput}
            value={number}
            defaultValue={userData?.phone}
            defaultCode={countryCode}
            disabled={true}
          />
        )}

        <View style={className("my-5")}>
          <CustomButton
            title={"Save Changes"}
            loading={loading}
            onPress={handleUpdateUser}
            disabled={loading || imageLoader}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Profile;
const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: -5,
    left: 10,
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
  },
  logoutIcon: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // right: 10,
    // zIndex: 1,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
