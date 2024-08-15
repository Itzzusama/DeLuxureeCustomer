import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { endPoints } from "./ENV";
import { store } from "../store";
import { setToken, userLogout } from "../store/reducer/usersSlice";
import { notiLogout } from "../store/reducer/unseenNotiSlice";
import { servicesLogout } from "../store/reducer/servicesSlice";
import { catLogout } from "../store/reducer/categorySlice";
import { handleLogout } from "../utils/logoutHelper";

const baseURL = endPoints.BASE_URL;

const createApi = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 440) {
        handleLogout();
      } else {
        return Promise.reject(error);
      }
    }
  );
  const get = (url) => {
    return instance.get(url);
  };
  const post = (url, data) => {
    return instance.post(url, data);
  };
  const put = (url, data) => {
    return instance.put(url, data);
  };
  const del = (url) => {
    return instance.delete(url);
  };
  return { get, post, put, del };
};
export const { get, post, put, del } = createApi();
