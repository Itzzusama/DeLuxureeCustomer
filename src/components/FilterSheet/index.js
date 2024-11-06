import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { className } from "../../global-styles";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import fonts from "../../assets/fonts";
import GooglePlaces from "../GooglePlaces";
import CustomButton from "../CustomButton";
import Categories from "./Categories";
import Slider from "./Slider";
import { post } from "../../services/ApiRequest";
import { ToastMessage } from "../../utils/ToastMessage";

const FilterSheet = ({ sheetRef, setFilterData }) => {
  const [value, setValue] = useState("");
  const data = ["All Service", "Kitchen", "Luxe", "Move", "Luxe +"];
  const [tab, setTab] = useState("All Service");
  const [multiSliderValue, setMultiSliderValue] = useState([20, 800]);
  const [latLng, setLatLng] = useState({});
  const multiSliderValuesChange = (values) => {
    setMultiSliderValue(values);
  };
  const [loading, setLoading] = useState(false);
  const resetFilter = () => {
    setValue("");
    setTab("All Service");
    setMultiSliderValue([20, 800]);
    setLatLng({});
  };

  const applyFilter = async () => {
    setLoading(true);
    try {
      const body = {
        type: "all", //["all",'floor', 'laundry', "bathroom",'shoe'];
        // "search": "",
        // "last_id": "",
        price: true,
        min: multiSliderValue[0],
        max: multiSliderValue[1],
        lat: latLng?.latitude,
        lng: latLng?.longitude,
      };
      console.log(body);
      const res = await post("service/filter", body);
      if (res.data.success) {
        setFilterData(res.data.services);
        sheetRef.current.close();
      } else {
        ToastMessage(res.data.message);
        resetFilter();
      }
    } catch (e) {
      console.log(e);
      console.log(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <RBSheet
      ref={sheetRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      customStyles={{
        draggableIcon: {
          backgroundColor: "#000",
        },
        container: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 20,
          height: 380,
        },
      }}
    >
      <View style={className("flex-1 mt-4")}>
        <CustomText
          label={"Filter Services"}
          fontFamily={fonts.bold}
          alignSelf={"center"}
          fontSize={18}
        />
        <GooglePlaces
          withLabel={"Location"}
          value={value}
          setValue={setValue}
          setLatLong={setLatLng}
        />
        {/* <Categories tab={tab} setTab={setTab} data={data} /> */}
        <Slider
          multiSliderValue={multiSliderValue}
          multiSliderValuesChange={multiSliderValuesChange}
        />
        <CustomButton
          title={"Apply Filter"}
          onPress={applyFilter}
          loading={loading}
          disabled={loading}
        />
      </View>
    </RBSheet>
  );
};

export default FilterSheet;
