import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";

//screens
import TabStack from "./TabStack";
import InBox from "../screens/Main/InBox";
import Profile from "../screens/Main/ProfileScreens/Profile";
import PastBooking from "../screens/Main/ProfileScreens/PastBooking";
import ChangePassword from "../screens/Main/ProfileScreens/ChangePassword";
import HelpCenter from "../screens/Main/ProfileScreens/HelpCenter";
import Policy from "../screens/Main/ProfileScreens/Policy";
import BookingDetail from "../screens/Main/BookingDetail";
import ProviderDetail from "../screens/Main/ProviderDetail";
import BookingForm from "../screens/Main/BookingForm";
import ConfirmBooking from "../screens/Main/ConfirmBooking";
import Review from "../screens/Main/Review";
import Notifications from "../screens/Main/Notifications";
import SavedServices from "../screens/Main/ProfileScreens/SavedServices";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  //

  const { userType } = useSelector((store) => store?.user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="HomeStack" component={TabStack} />
      <Stack.Screen name="InBox" component={InBox} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PastBooking" component={PastBooking} />
      <Stack.Screen name="SavedServices" component={SavedServices} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="Policy" component={Policy} />
      <Stack.Screen name="BookingDetail" component={BookingDetail} />
      <Stack.Screen name="ProviderDetail" component={ProviderDetail} />
      <Stack.Screen name="BookingForm" component={BookingForm} />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default MainStack;
