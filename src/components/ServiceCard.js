import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  isPast,
} from "react-native";
import React, { useState } from "react";
import { className } from "../global-styles";
import { Images, Receipt } from "../assets/images";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";
import { put } from "../services/ApiRequest";
import { ToastMessage } from "../utils/ToastMessage";
import { useDispatch } from "react-redux";
import { fetchServices } from "../store/reducer/servicesSlice";

const ServiceCard = ({
  onPress,
  btnPress,
  isCompleted,
  item,
  isOrder,
  fetchOrders,
  order,
  showHeart = false,
  tokenExists,
}) => {
  const navigation = useNavigation();
  const color =
    order?.status === "completed"
      ? colors.green
      : order?.status === "cancelled"
      ? colors.red
      : order?.status === "pending"
      ? colors.primaryColor
      : colors.green;

  const [loading, setLoading] = useState(false);
  const updateStatus = async () => {
    const statusToSend = order?.status == "pending" ? "cancelled" : "completed";
    try {
      setLoading(true);
      const res = await put(`order/customer/${statusToSend}/${order?._id}`);
      if (res.data.success) {
        ToastMessage(res.data.message);
        fetchOrders();
      } else {
        ToastMessage(res.data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const disptach = useDispatch();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(item?.likes);
  const handleSaved = async () => {
    setSaving(true);
    try {
      const res = await put(`service/like/${item?._id}`);

      if (res.data.message) {
        console.log(res.data.message);
        disptach(fetchServices());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Pressable
      style={[className("p-2 flex bg-white  mb-3 rounded-2"), styles.shadow]}
      onPress={
        isOrder
          ? btnPress
          : () => {
              navigation.navigate("ProviderDetail", { detail: item });
            }
      }
    >
      <Image
        source={item?.images ? { uri: item?.images[0] } : Images.intro1}
        style={{
          height: 80,
          width: 80,
          borderRadius: 8,
          resizeMode: "contain",
        }}
      />
      <View style={className("ml-2 flex-1")}>
        <View style={className("pr-2")}>
          <View style={className("flex align-center justify-between flex-1")}>
            <CustomText
              label={item?.title}
              fontSize={14}
              fontFamily={fonts.semiBold}
              color={colors.blk2}
              numberOfLines={1}
            />
            {showHeart && tokenExists && (
              <TouchableOpacity
                onPress={() => {
                  handleSaved();
                  setSaved(!saved);
                }}
                activeOpacity={0.8}
              >
                <Icons
                  family={"AntDesign"}
                  color={colors.primaryColor}
                  size={17}
                  name={saved ? "heart" : "hearto"}
                />
              </TouchableOpacity>
            )}
          </View>

          <CustomText
            label={item?.description}
            fontSize={12}
            color={colors.grey}
            numberOfLines={1}
            marginTop={3}
          />
        </View>

        <View style={className("flex align-center justify-between mt-3 ")}>
          {isPast ? (
            <CustomText
              label={"18/11/2024"}
              color={colors.headLine}
              fontFamily={fonts.semiBold}
              fontSize={12}
            />
          ) : (
            <View style={className("flex align-center mt-2")}>
              {isOrder &&
                (order?.status == "pending" ||
                  order?.status == "complete_request") && (
                  <TouchableOpacity
                    style={[styles.statusBox, { borderColor: color }]}
                    onPress={updateStatus}
                  >
                    {loading ? (
                      <ActivityIndicator
                        color={colors.primaryColor}
                        size={"small"}
                      />
                    ) : (
                      <CustomText
                        label={
                          order?.status == "pending"
                            ? "Cancel"
                            : "Complete Request"
                        }
                        color={color}
                        fontFamily={fonts.semiBold}
                        textTransform={"capitalize"}
                      />
                    )}
                  </TouchableOpacity>
                )}
            </View>
          )}
          {isOrder ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                className("flex align-center bor-1 rounded-1 bg-white p-1"),
                { borderColor: colors.headLine },
              ]}
            >
              <CustomText
                label={`$${order?.amount}`}
                color={colors.headLine}
                fontFamily={fonts.semiBold}
                //marginLeft={2}
                fontSize={12}
              />
            </TouchableOpacity>
          ) : (
            <CustomText
              label={`$${item?.price}`}
              color={colors.headLine}
              fontFamily={fonts.semiBold}
              containerStyle={[className("bg-lightGreen p-1 px-2 rounded-2")]}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Offset for shadow for iOS
    shadowOpacity: 0.1, // Opacity for shadow for iOS
    shadowRadius: 3.84, // Radius for shadow for iOS
    elevation: 1, // Elevation for shadow for Android
  },
  statusBox: {
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
});
