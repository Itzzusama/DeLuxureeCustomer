import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//screens
import ForgotPassword from "../screens/Auth/ForgotPassword";
import NewPassword from "../screens/Auth/ForgotPassword/NewPassword";
import VerifyOtp from "../screens/Auth/ForgotPassword/VerifyOtp";
import GetStarted from "../screens/Auth/GetStarted";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import Intro from "../screens/Auth/Intro";
import Splash from "../screens/Auth/Splash";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  //

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
