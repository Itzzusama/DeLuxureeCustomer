import {
  Image,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import MapView, { Marker } from "react-native-maps";
import CustomHeader from "../../../components/CustomHeader";
import { Images } from "../../../assets/images";
import SearchBar from "../../../components/SearchBar";
import ServiceCard from "../../../components/ServiceCard";
import Tab from "../../../components/TabBar";
import CustomText from "../../../components/CustomText";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../../../components/NoDataFound";
import { useFocusEffect } from "@react-navigation/native";
import { fetchServices } from "../../../store/reducer/servicesSlice";
const Search = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [tab, setTab] = useState("All Services");
  const service = useSelector((state) => state?.services?.services);
  const loading = useSelector((state) => state?.services?.loading);
  const [filterData, setFilterData] = useState(service);
  const handleSearch = (query) => {
    let text = query.toLowerCase();
    if (!text || text === "") {
      setFilterData(service);
    } else {
      const filterServices = service.filter(
        (service) =>
          service?.title.toLowerCase().includes(text) ||
          service?.cat?.name.toLowerCase().includes(text) ||
          service?.description?.toLowerCase().includes(text)
      );
      setFilterData(filterServices);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchServices());
      return () => {};
    }, [])
  );

  const fitAllMarkers = () => {
    if (service?.length > 0 && mapRef.current) {
      const coordinates = service.map((service) => ({
        latitude: service.location.coordinates[1],
        longitude: service.location.coordinates[0],
      }));
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <Layout
      isSafeAreaView={true}
      showNoti
      customHeader={
        <CustomHeader
          title={"Find Nearby Services"}
          customStyle={{ tintColor: colors.black }}
        />
      }
      layoutContainer={{ paddingHorizontal: 0 }}
    >
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.mapView}
          onMapReady={fitAllMarkers}
          zoomEnabled={true}
          zoomTapEnabled={true}
          rotateEnabled={true}
          initialRegion={{
            latitude: 32.7963244,
            longitude: -111.7754911,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {filterData?.map((service, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: service.location.coordinates[1],
                longitude: service.location.coordinates[0],
              }}
            >
              <View style={styles.imageCircle}>
                <Image
                  resizeMode="contain"
                  source={Images.flagIcon}
                  style={styles.flag}
                />
              </View>
            </Marker>
          ))}
        </MapView>
        <View style={[className("my-3 mx-4")]}>
          <SearchBar
            showFilter={true}
            handleSearch={handleSearch}
            setFilterData={setFilterData}
          />
        </View>

        <Tab tab={tab} setTab={setTab} isMap />
      </View>
      <View style={styles.bottomList}>
        <View style={className("flex align-center justify-between my-3")}>
          <CustomText
            label={tab == "All Services" ? "All Services" : tab}
            fontFamily={fonts.semiBold}
            fontSize={18}
            color={colors.blk2}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={className("pb-3")}
          data={
            tab == "All Services"
              ? filterData
              : filterData.filter((service) => service?.cat?.name == tab)
          }
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => dispatch(fetchServices())}
            />
          }
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <ServiceCard item={item} showHeart />}
          ListEmptyComponent={
            loading ? null : (
              <NoDataFound
                source={Images.noShow}
                title={"No Service Available"}
                marginTop={1}
              />
            )
          }
        />
      </View>
    </Layout>
  );
};

export default Search;
const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    flex: 1,
    overflow: "hidden",
  },
  mapView: {
    width: "100%",
    height: "100%",
    ...StyleSheet.absoluteFillObject,
  },
  bottomList: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 19,
    backgroundColor: colors.mainBg,
    height: 230,
    paddingTop: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
  },
  imageCircle: {
    width: 30,
    height: 30,
    backgroundColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  flag: {
    width: 18,
    height: 18,
  },
});
