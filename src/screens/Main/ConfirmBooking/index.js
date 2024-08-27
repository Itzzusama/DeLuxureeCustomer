import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import { DatePicker } from "../../../components/DatePicker";
import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";
import { colors } from "../../../utils/colors";
import { Images } from "../../../assets/images";
import Icons from "../../../components/Icons";
import { Next } from "../../../assets/images";
import PaymentCard from "./PaymentCard";
import PriceDetail from "./PriceDetail";
import EventDetail from "./EventDetail";
import { formatDate, formatTime } from "../../../utils/dateUtils";
import { useStripe } from "@stripe/stripe-react-native";
import { endPoints } from "../../../services/ENV";
import { post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
const ConfirmBooking = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const route = useRoute();
  const { reqData, detail } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const ApiData = {
      amount: Number(reqData?.amount),
    };
    try {
      const res = await post("payment/create", ApiData);
      const { customer, ephemeralKey, paymentIntent, paymentId } = res.data;
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "DeLuxree",
        allowsDelayedPaymentMethods: false,
        returnURL: "https://deluxcleaning.onrender.com/api ",
      });
      if (!error) {
        openPaymentSheet(paymentIntent, paymentId);
      }
    } catch (err) {
      console.log("nn", err);
    } finally {
      setLoading(false);
    }
  };
  const openPaymentSheet = async (payIntent, paymentId) => {
    setLoading(true);
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      setLoading(false);
    } else {
      setLoading(true);
      const ApiData = {
        ...reqData,
        paymentId: paymentId,
      };
      console.log(ApiData);
      try {
        const res = await post("order/create", ApiData);
        if (res.data.success) {
          navigation.navigate("Orders", { screen: "Pending" });
        } else {
          ToastMessage(res.data.message);
        }
      } catch (err) {
        ToastMessage(err?.response?.data?.message);
        console.log(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };
  console.log(detail);
  return (
    <Layout title={"Confirm and Pay"} isScroll>
      <View style={className("bor-1 border-grey1 rounded-2 p-2 px-3")}>
        <View style={className("flex")}>
          <Image source={{ uri: detail?.images[0] }} style={styles.img} />
          <View style={className("ml-2")}>
            <CustomText
              label={detail?.title}
              fontSize={14}
              color={colors.black}
              fontFamily={fonts.bold}
            />
            <CustomText
              label={`(${detail?.cat?.name})`}
              fontSize={14}
              color={colors.headLine}
              fontFamily={fonts.bold}
              textTransform={"capitalize"}
            />
            <View style={className("flex align-center my-2")}>
              <Icons
                family={"AntDesign"}
                name={"calendar"}
                size={14}
                color={colors.blk2}
              />
              <CustomText
                label={formatDate(reqData?.date)}
                color={colors.blk2}
                fontSize={10}
                fontFamily={fonts.medium}
                marginLeft={4}
              />
            </View>
            <View style={className("flex align-center")}>
              <Icons
                family={"Ionicons"}
                name={"time-outline"}
                size={14}
                color={colors.blk2}
              />
              <CustomText
                label={formatTime(reqData?.time)}
                color={colors.blk2}
                fontSize={10}
                fontFamily={fonts.medium}
                marginLeft={4}
              />
            </View>
          </View>
        </View>

        {/* <EventDetail /> */}
        <PriceDetail price={detail?.price} />
      </View>
      {/* <PaymentCard /> */}
      <CustomButton
        title={"Pay Now"}
        customStyle={className("my-10")}
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
      />
    </Layout>
  );
};

export default ConfirmBooking;
const styles = StyleSheet.create({
  img: {
    height: 90,
    width: 90,
    borderRadius: 8,
  },
});
