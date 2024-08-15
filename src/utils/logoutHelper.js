// utils/logoutHelper.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../store";
import { setToken, userLogout } from "../store/reducer/usersSlice";
import { notiLogout } from "../store/reducer/unseenNotiSlice";
import { servicesLogout } from "../store/reducer/servicesSlice";
import { catLogout } from "../store/reducer/categorySlice";
import { useNavigation } from "@react-navigation/native";
export const handleLogout = async () => {
  console.log("User logged out--");
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("fcmToken");
  store.dispatch(setToken(""));
  store.dispatch(userLogout());
  store.dispatch(notiLogout());
  store.dispatch(servicesLogout());
  store.dispatch(catLogout());

  //   if (navigation) {
  //     console.log("jjjjj");
  //     navigation.reset({ index: 0, routes: [{ name: "AuthStack" }] });
  //   }
};
