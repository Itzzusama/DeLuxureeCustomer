import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import { className } from "../global-styles";
import { colors } from "../utils/colors";
import { del } from "../services/ApiRequest";
import { ToastMessage } from "../utils/ToastMessage";
import { useDispatch } from "react-redux";
import { setToken, userLogout } from "../store/reducer/usersSlice";
import { catLogout } from "../store/reducer/categorySlice";
import { servicesLogout } from "../store/reducer/servicesSlice";
import { notiLogout } from "../store/reducer/unseenNotiSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
GoogleSignin.configure({
  webClientId:
    "40372426505-gad73g4168ia8h2qhsru726uc42bv9b2.apps.googleusercontent.com", // From Firebase Console
});
const LogoutSheet = ({ bottomSheetRef, type }) => {
  const navigation = useNavigation();
  const insets=useSafeAreaInsets()
  const dispatch = useDispatch();
  const [loading,setLoading]=useState(false)
  const handleLogout = async () => {
    setLoading(true)
    try {
      if (type == "del_account") {
        const res = await del("users/");
        if (res.data.success) {
          ToastMessage("The account has been successfully deleted!");
        }
      }
      await AsyncStorage.removeItem("token");
      await GoogleSignin.signOut();
      dispatch(setToken(""));
      dispatch(userLogout());
      dispatch(catLogout());
      dispatch(servicesLogout());
      dispatch(notiLogout());
    } catch (error) {}finally{
      setLoading(false)
      bottomSheetRef.current.close();
      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: "AuthStack" }] });
      }, 500);
    }
  };
  return (
    <RBSheet
      ref={bottomSheetRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        draggableIcon: {
          backgroundColor: "#000",
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 20,
          height: 200,
        },
      }}
    >
      <View style={className("flex-1")}>
        <Text
          style={className("text-base text-black text-bold text-center my-5")}
        >
          Hold On!
        </Text>
        <Text style={className("text-15 text-black text-center")}>
          {type == "logout"
            ? "Are you sure you want to logout?"
            : "Are you sure you want to delete account?"}
        </Text>
      </View>
      <View style={[className("flex-row justify-between mb-5"),{marginBottom:Platform.OS=='ios'?insets.bottom:20}]}>
        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.close()}
          style={[styles.Btn, className("bg-white bor-1")]}
        >
          <Text style={className("text-base text-pm")}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            className("w-full  justify-center align-center h-full"),
            styles.Btn,
          ]}
          onPress={handleLogout}
        >
          {
            loading ?
            <ActivityIndicator/> :
          <Text style={className("text-white text-base")}>
            {type == "logout" ? "Logout" : "Delete"}
          </Text>
          }
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default LogoutSheet;

const styles = StyleSheet.create({
  Btn: {
    width: "46%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
  },
});
