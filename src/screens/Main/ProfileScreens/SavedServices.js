import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import ProfileHeader from "../../../components/ProfileHeader";
import CustomButton from "../../../components/CustomButton";
import {
  Help,
  History,
  Images,
  Lock,
  Next,
  Person,
  Security,
} from "../../../assets/images";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import ServiceCard from "../../../components/ServiceCard";
import NoDataFound from "../../../components/NoDataFound";
import { get } from "../../../services/ApiRequest";
const SavedServices = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await get(`service/fav/me/1`);
      if (res.data.success) {
        setService(res.data.services);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to fetch saved:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchServices();
      return () => {};
    }, [])
  );

  const getMoreService = async () => {
    if (service?.length > 0) {
      try {
        const lastService = service[service?.length - 1]?._id;
        const res = await get(`service/fav/me/${page}`);
        if (res.data.success) {
          setPage((prevPage) => prevPage + 1);
          const newService = res.data.services;
          setOrders([...service, ...newService]);
        }
      } catch (err) {}
    }
  };
  return (
    <Layout title={"Liked Services"} isScroll>
      <FlatList
        data={service}
        contentContainerStyle={className("pt-5")}
        refreshControl={<RefreshControl refreshing={loading} />}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          getMoreService();
        }}
        renderItem={({ item }) => <ServiceCard item={item} showHeart />}
        ListEmptyComponent={
          !loading && (
            <NoDataFound
              source={Images.noShow}
              title={"No saved service found"}
              marginTop={90}
            />
          )
        }
      />
    </Layout>
  );
};

export default SavedServices;
