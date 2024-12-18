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
  webClientId:"40372426505-gad73g4168ia8h2qhsru726uc42bv9b2.apps.googleusercontent.com"
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
      name:userCredential.user?.displayName||""
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
        ToastMessage("That email has already been registered with other account type.");
        await GoogleSignin.signOut();
      }
    } catch (err) {
      await GoogleSignin.signOut();
      ToastMessage(err?.response?.data?.message);
    }
  } catch (error) {
    await GoogleSignin.signOut();
    console.log("error======>",error);
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
      name: appleData?.fullName?.familyName || "",
      user_type: "customer",
    };
    try {
      const response = await post("auth/social-login", reqData);
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
        ToastMessage("That email has already been registered with other account type.");
      }
    } catch (err) {
      ToastMessage(err?.response?.data?.message);
    }
  } catch (error) {
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
