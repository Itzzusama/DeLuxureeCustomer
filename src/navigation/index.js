import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//screens
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import { className } from "../global-styles";
import fonts from "../assets/fonts";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../utils/colors";
import CustomModal from "../components/CustomModal";
import { setModal } from "../store/reducer/usersSlice";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state?.user?.modal);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
      {modal && (
        <CustomModal
          isVisible={modal}
          onDisable={() => dispatch(setModal(false))}
        >
          <View style={styles.modalMainContainer}>
            <CustomText
              label={"Alert!"}
              alignSelf={"center"}
              textAlign={"center"}
              fontFamily={fonts.bold}
              fontSize={20}
            />
            <CustomText
              label={
                "Your account has been Deactivated please contact the admin for further support"
              }
              alignSelf={"center"}
              textAlign={"center"}
              textStyle={className("mx-5 mt-3 text-14")}
              fontFamily={fonts.regular}
            />
            <CustomButton
              title={"Contac us"}
              customStyle={className("w-50 h-12 mt-6")}
              onPress={() => {
                dispatch(setModal(false));
                navigation.navigate("MainStack", { screen: "HelpCenter" });
              }}
            />
          </View>
        </CustomModal>
      )}
    </View>
  );
};

export default RootNavigation;
const styles = StyleSheet.create({
  modalMainContainer: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 240,
  },
});
