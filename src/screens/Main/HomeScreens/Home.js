import { FlatList, RefreshControl, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import CustomHeader from "../../../components/CustomHeader";
import SearchBar from "../../../components/SearchBar";
import CustomText from "../../../components/CustomText";
import CategoryCard from "../../../components/CategoryCard";
import { Images } from "../../../assets/images";
import Tab from "../../../components/TabBar";
import ServiceCard from "../../../components/ServiceCard";
import OfferCard from "../../../components/OfferCard";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../../services/ApiRequest";
import NoDataFound from "../../../components/NoDataFound";
import { fetchServices } from "../../../store/reducer/servicesSlice";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cateogories = useSelector((state) => state?.categories?.categories);
  const services = useSelector((state) => state?.services?.services);
  const userData = useSelector((state) => state?.user?.loginUser);
  const [filterData, setFilterData] = useState(services);
  const loading = useSelector((state) => state?.services?.loading);

  useEffect(() => {
    filterServices(selectedCategory);
  }, [services, selectedCategory]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchServices());
    }, [dispatch])
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filterServices = (category) => {
    if (!category) {
      setFilterData(services);
    } else {
      const filtered = services.filter(
        (service) => service?.cat?.name === category?.name
      );
      setFilterData(filtered);
    }
  };

  const handleSearch = (query) => {
    let text = query.toLowerCase();
    if (!text || text === "") {
      filterServices(selectedCategory);
    } else {
      const filterServices = services.filter(
        (service) =>
          service?.title.toLowerCase().includes(text) ||
          service?.cat?.name.toLowerCase().includes(text) ||
          service?.description?.toLowerCase().includes(text)
      );
      setFilterData(filterServices);
    }
  };

  return (
    <Layout
      isHome
      showNoti
      customHeader={<CustomHeader title={`Hi, ${userData?.name} 🖐`} />}
      isScroll
      layoutContainer={{ paddingHorizontal: 0 }}
    >
      <SearchBar
        customContainer={{ paddingHorizontal: 20 }}
        customInput={{ backgroundColor: colors.dimGreen }}
        placeHolderText={"How we can help you today?"}
        handleSearch={handleSearch}
      />

      <View style={className("flex align-center justify-between px-6 mt-2")}>
        <CustomText
          label={"Categories"}
          fontFamily={fonts.semiBold}
          fontSize={18}
          color={colors.blk2}
        />
      </View>
      <View style={className("")}>
        <FlatList
          contentContainerStyle={className("px-6")}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={cateogories}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <CategoryCard
              title={item?.name}
              img={item?.image}
              onPress={() => handleCategorySelect(item)}
            />
          )}
        />
      </View>
      <View style={className("bor-b-1 border-grey1 mx-6")} />
      <View
        style={className("flex align-center justify-between px-6 mt-4 mb-2")}
      >
        <CustomText
          label={!selectedCategory ? "All Services" : selectedCategory?.name}
          fontFamily={fonts.semiBold}
          fontSize={18}
          color={colors.blk2}
        />
      </View>

      <View style={className("px-6 mt-2")}>
        <FlatList
          contentContainerStyle={className("pb-3")}
          data={filterData}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => dispatch(fetchServices())}
            />
          }
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <ServiceCard item={item} showHeart />}
          ListEmptyComponent={
            <NoDataFound
              source={Images.noShow}
              title={"No Service Available"}
              marginTop={1}
            />
          }
        />
      </View>
    </Layout>
  );
};

export default Home;
