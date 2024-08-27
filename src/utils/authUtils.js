import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { appleAuth } from "@invertase/react-native-apple-authentication";
import jwt_decode from "jwt-decode";
import { setToken, setUserType } from "../store/reducer/usersSlice";
import { ToastMessage } from "./ToastMessage";
import { post } from "../services/ApiRequest";

GoogleSignin.configure({
  webClientId:
    "157599591616-dmlv0dbsrcc8cl71910fa01jh50pj8do.apps.googleusercontent.com", // From Firebase Console
});

export const signInWithGoogle = async (navigation, dispatch, setLoading) => {
  try {
    setLoading((prevState) => ({ ...prevState, google: true }));
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken
    );
    const userCredential = await auth().signInWithCredential(googleCredential);

    const email = userCredential.user.email;
    console.log(email);
    const fcmtoken = await AsyncStorage.getItem("fcmToken");
    const reqData = {
      email: email,
      fcmtoken: fcmtoken,
      user_type: "customer",
    };
    try {
      const response = await post("auth/social-login", reqData);
      console.log(response);
      if (response?.data?.token && response?.data?.user?.type == "customer") {
        await AsyncStorage.setItem("token", response.data?.token);
        dispatch(setUserType(response.data.user.type));
        dispatch(setToken(response.data.token));
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "MainStack",
            },
          ],
        });
      } else {
        ToastMessage("Invalid credentials");
        await GoogleSignin.signOut();
      }
    } catch (err) {
      await GoogleSignin.signOut();
      console.log(err);
      ToastMessage(err?.response?.data?.error || "Something went wrong");
    }
  } catch (error) {
    await GoogleSignin.signOut();
    handleSignInError(error);
  } finally {
    setLoading((prevState) => ({ ...prevState, google: false }));
  }
};

export const signInWithApple = async (navigation, dispatch, setLoading) => {
  try {
    setLoading((prevState) => ({ ...prevState, apple: true }));
    const appleData = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log(appleData.identityToken);
    if (!appleData.identityToken)
      return ToastMessage("An error occurred during Apple sign in");

    let res;
    if (appleData.email == null || appleData.email == undefined) {
      res = await jwt_decode(appleData.identityToken);
    } else {
      res = appleData;
    }

    const fcmtoken = await AsyncStorage.getItem("fcmToken");
    const reqData = {
      email: res.email,
      fcmtoken: fcmtoken,
      name: appleData?.fullName || "",
      user_type: "customer",
    };
    try {
      const response = await post("auth/social-login", reqData);
      console.log(response.data.user.type);
      if (response.data?.token && response?.data?.user?.type == "customer") {
        await AsyncStorage.setItem("token", response.data?.token);
        dispatch(setUserType(response.data.user.type));
        dispatch(setToken(response.data.token));
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "MainStack",
            },
          ],
        });
      } else {
        ToastMessage("Invalid credentials");
      }
    } catch (err) {
      ToastMessage(err?.response?.data?.message || "Something went wrong");
    }
  } catch (error) {
    ToastMessage("An error occurred during Apple sign in");
  } finally {
    setLoading((prevState) => ({ ...prevState, apple: false }));
  }
};

const handleSignInError = (error) => {
  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    ToastMessage("User cancelled the login flow");
    console.log("User cancelled the login flow");
  } else if (error.code === statusCodes.IN_PROGRESS) {
    console.log("Sign in operation is in progress");
    ToastMessage("Sign in operation is in progress");
  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    console.log("Google Play services are not available");
    ToastMessage("Google Play services are not available");
  } else {
    console.log("An error occurred during Google sign in");
    ToastMessage("An error occurred during Google sign in");
  }
};
