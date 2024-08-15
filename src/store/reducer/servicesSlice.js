import { createSlice } from "@reduxjs/toolkit";
import { get, post } from "../../services/ApiRequest";

const initialState = {
  loading: false,
  services: [],
};
// First, define the reducer and action creators via `createSlice`
export const servicesSlice = createSlice({
  name: "services",
  initialState: initialState,
  reducers: {
    servicesLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = true;
    },
    servicesLoadingEnd(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = false;
    },
    servicesReceived(state, action) {
      state.services = action.payload;
    },
    servicesLogout(state) {
      state.loading = initialState.loading;
      state.services = initialState.services;
    },
  },
});

// // Action creators are generated for each case reducer function
// Destructure and export the plain action creators
export const {
  servicesLoading,
  servicesReceived,
  servicesLogout,
  servicesLoadingEnd,
} = servicesSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchServices = () => async (dispatch) => {
  dispatch(servicesLoading());
  try {
    const response = await post("service/filter", { type: "all" });
    if (response.data.success) {
      dispatch(servicesReceived(response.data.services));
    }
  } catch (error) {
    console.log("Failed to get services", error);
  } finally {
    dispatch(servicesLoadingEnd());
  }
};
