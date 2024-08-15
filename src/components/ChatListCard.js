import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { className } from "../global-styles";
import { Images } from "../assets/images";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { colors } from "../utils/colors";
import { formatTime } from "../utils/dateUtils";

const ChatListCard = ({ item, onPress }) => {
  return (
    <Pressable style={className("flex mb-5")} onPress={onPress}>
      <Image
        source={
          item?.otherUser?.profilePicture
            ? { uri: item?.otherUser?.profilePicture }
            : Images.user
        }
        style={styles.img}
      />
      <View style={className("border-grey2 bor-b-1 flex-1 ml-2")}>
        <View style={className("flex align-center justify-between")}>
          <CustomText
            label={item?.otherUser?.name}
            fontSize={16}
            fontFamily={fonts.semiBold}
            color={colors.blk2}
            textTransform={"capitalize"}
          />
          <CustomText
            label={formatTime(item?.lastMsg?.createdAt)}
            fontSize={12}
            fontFamily={fonts.medium}
            color={colors.grey}
          />
        </View>
        <View style={className("flex align-center justify-between mb-3 mt-2")}>
          <CustomText
            label={item?.lastMsg?.message}
            fontSize={14}
            fontFamily={fonts.regular}
            color={colors.blk2}
            numberOfLines={1}
          />
          {!item?.lastMsg?.seen && item?.unseen != 0 && (
            <View
              style={[
                className("align-center justify-center rounded-2 px-1 "),
                { backgroundColor: colors.headLine },
              ]}
            >
              <CustomText
                label={item?.unseen}
                fontSize={11}
                fontFamily={fonts.medium}
                color={colors.white}
              />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ChatListCard;

const styles = StyleSheet.create({
  img: {
    height: 45,
    width: 45,
    borderRadius: 30,
  },
});
