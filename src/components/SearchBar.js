import React, { useRef } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/colors";
import fonts from "../assets/fonts";
import Icons from "./Icons";
import { Images } from "../assets/images";
import FilterSheet from "./FilterSheet";
const SearchBar = ({
  showFilter = false,
  handleSearch = () => "",
  customInput,
  customContainer,
  placeHolderText,
  setFilterData,
}) => {
  const sheetRef = useRef(null);
  return (
    <View style={[styles.container, customContainer]}>
      <View style={{ width: "100%" }}>
        <View style={styles.icon}>
          <Icons name={"search"} color={colors.grey} size={22} />
        </View>
        <TextInput
          onChangeText={handleSearch}
          style={[styles.input, customInput]}
          placeholder={placeHolderText || "Search"}
          placeholderTextColor={colors.grey}
          cursorColor={colors.primaryColor}
        />
      </View>

      {showFilter && (
        <TouchableOpacity
          style={styles.rightIocn}
          onPress={() => sheetRef.current?.open()}
        >
          <Image
            source={Images.adjust}
            style={{
              height: 24,
              width: 24,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      )}
      {showFilter && (
        <FilterSheet sheetRef={sheetRef} setFilterData={setFilterData} />
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: "row",
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingHorizontal: 10,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.black,
    flex: 1,
    paddingHorizontal: 55,
    height: 55,
  },
  icon: {
    position: "absolute",
    top: 16,
    zIndex: 1,
    left: 20,
  },
  rightIocn: {
    right: 20,
    zIndex: 1,
    top: 16,
    position: "absolute",
    borderLeftWidth: 1,
    borderColor: colors.grey3,
    paddingLeft: 8,
  },
});
