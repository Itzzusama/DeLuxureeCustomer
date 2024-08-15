import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image as ImageCompressor } from "react-native-compressor";
import { Platform, PermissionsAndroid } from "react-native";
// import messaging from '@react-native-firebase/messaging';
// import storage from '@react-native-firebase/storage';

import { ToastMessage } from "./ToastMessage";

export const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const uploadAndGetUrl = async (file) => {
  try {
    const resizeUri = await ImageCompressor.compress(
      file.fileCopyUri || file.path
    );

    const filename = `images/${new Date()
      .toISOString()
      .replace(/[.:-]+/g, "_")}`;
    const uploadUri =
      Platform.OS === "ios" ? resizeUri.replace("file://", "") : resizeUri;
    const storageRef = storage().ref(filename);
    await storageRef.putFile(uploadUri);
    const url = await storageRef.getDownloadURL();
    console.log("Image uploaded successfully");
    return url;
  } catch (err) {
    console.log("=======er", err);
    ToastMessage("Upload Again");
  }
};
export const getToken = async () => {
  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );
  const fcmToken = await AsyncStorage.getItem("fcmToken");
  // console.log('=======fcmToken', fcmToken);
  if (!fcmToken) {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    const token = await messaging().getToken();
    await AsyncStorage.setItem("fcmToken", token);
  } else {
    return;
  }
};

export function _formatDate(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  if (now - date < 604800000) {
    if (now.toDateString() === date.toDateString()) {
      return "Today";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
    }
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
export function processArray(arr) {
  const groupedData = {};

  arr.forEach((item) => {
    const day = _formatDate(item.createdAt);
    if (!groupedData[day]) {
      groupedData[day] = [item];
    } else {
      groupedData[day].push(item);
    }
  });

  Object.keys(groupedData).forEach((day) => {
    const items = groupedData[day];
    const lastIndex = items.length - 1;

    items.forEach((item, index) => {
      item.day = day;
      item.show = index === lastIndex;
    });
  });

  const result = arr.map((item) => ({ ...item }));
  return result;
}
var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export const formatPrice = (number) => {
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formattedNumber =
    scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);
  return formattedNumber + suffix;
};
