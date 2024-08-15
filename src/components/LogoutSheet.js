import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
GoogleSignin.configure({
  webClientId:
    "157599591616-dmlv0dbsrcc8cl71910fa01jh50pj8do.apps.googleusercontent.com", // From Firebase Console
});
const LogoutSheet = ({ bottomSheetRef, type }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    bottomSheetRef.current.close();
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
    navigation.reset({ index: 0, routes: [{ name: "AuthStack" }] });
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
      <View style={className("flex-row justify-between mb-5")}>
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
          <Text style={className("text-white text-base")}>
            {type == "logout" ? "Logout" : "Delete"}
          </Text>
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
