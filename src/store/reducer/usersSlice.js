import { createSlice } from "@reduxjs/toolkit";
import { get } from "../../services/ApiRequest";

const initialState = {
  loginUser: {},
  userType: "",
  token: "",
  modal: false,
};

export const usersSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userReceived(state, action) {
      state.loginUser = action.payload;
    },
    setUserType(state, action) {
      state.userType = action.payload;
    },
    userLogout(state) {
      state.loginUser = {};
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setModal(state, action) {
      state.modal = action.payload;
    },
  },
});

export const {
  userReceived,
  userLogout,
  setUserType,
  setToken,
  setModal,
} = usersSlice.actions;

export const getUserProfile = async (dispatch) => {
  try {
    const res = await get("users/me/");
    if (res.data?.user) {
      dispatch(userReceived(res?.data?.user));
    } else {
      console.log("no data found");
    }
  } catch (error) {
    console.log(error);
  }
};
