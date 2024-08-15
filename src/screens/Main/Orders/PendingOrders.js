import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";
import { get } from "../../../services/ApiRequest";
import { useSelector } from "react-redux";
import NoDataFound from "../../../components/NoDataFound";
import ServiceCard from "../../../components/ServiceCard";
import { Images } from "../../../assets/images";

const PendingOrders = () => {
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await get(`order/customer/pending`);
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
      return () => {};
    }, [])
  );

  const getMoreOrders = async () => {
    if (order?.length > 0) {
      try {
        const lastOrder = order[order?.length - 1]?._id;
        const res = await get(`order/customer/pending/${lastOrder}`);
        if (res.data.success) {
          const newOrder = res.data.orders;
          setOrders([...order, ...newOrder]);
        }
      } catch (err) {}
    }
  };
  const navigation = useNavigation();

  return (
    <Layout showNavBar={false} isSafeAreaView={false} isScroll>
      <FlatList
        data={order}
        contentContainerStyle={className("pt-5")}
        refreshControl={<RefreshControl refreshing={loading} />}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          getMoreOrders();
        }}
        renderItem={({ item }) => (
          <ServiceCard
            order={item}
            item={item.service}
            isOrder
            fetchOrders={fetchOrders}
            btnPress={() =>
              navigation.navigate("BookingDetail", { orderDetail: item })
            }
          />
        )}
        ListEmptyComponent={
          !loading && (
            <NoDataFound
              source={Images.noShow}
              title={"No booking found"}
              marginTop={70}
            />
          )
        }
      />
    </Layout>
  );
};

export default PendingOrders;
