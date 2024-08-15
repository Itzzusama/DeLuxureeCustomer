import {
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Icons from "../../../components/Icons";

import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";

const Footer = ({ inputText, setInputText, sendMessage }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          multiline
          onChangeText={(text) => setInputText(text)}
        />

        {inputText?.length ? (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={sendMessage}>
            <Image
              source={Images.sendButton}
              style={{ height: 42, width: 42 }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: "20%",
              marginRight: 5,
            }}
          >
            <Icons
              family="AntDesign"
              name="plus"
              size={22}
              color={colors.grey}
              onPress={() => {}}
            />
            <Icons
              family="Feather"
              name="smile"
              size={22}
              color={colors.grey}
              onPress={() => {}}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    // paddingBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    width: "100%",
    backgroundColor: "#e4f0ec",
    borderRadius: 99,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    padding: 0,
    margin: 0,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.black,
    maxHeight: 100,
  },
});
