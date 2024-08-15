import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomText from "../CustomText";
import { colors } from "../../utils/colors";
import fonts from "../../assets/fonts";

const Categories = ({ tab, setTab, data }) => {
  return (
    <View style={styles.mainContainer}>
      <CustomText
        label={`Categories`}
        fontFamily={fonts.semiBold}
        fontSize={18}
        marginBottom={20}
      />
      <FlatList
        keyExtractor={(_, i) => i.toString()}
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setTab(item)}
            activeOpacity={0.8}
            style={[
              styles.item,
              {
                backgroundColor:
                  tab === item ? colors.primaryColor : colors.white,
                marginRight: 15,
                borderColor:
                  tab === item ? colors.primaryColor : colors.lightGrey,
              },
            ]}
          >
            <CustomText
              textTransform="capitalize"
              fontFamily={fonts.semiBold}
              label={item}
              color={tab === item ? colors.white : colors.grey}
              fontSize={14}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  mainContainer: {},
  item: {
    flex: 1,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.headLine,
  },
});
