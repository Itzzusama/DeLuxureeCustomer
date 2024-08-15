import { createSlice } from "@reduxjs/toolkit";
import { get } from "../../services/ApiRequest";

const initialState = {
  loading: false,
  noti: 0,
};
// First, define the reducer and action creators via `createSlice`
export const unseenNotiSlice = createSlice({
  name: "noti",
  initialState: initialState,
  reducers: {
    notiLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = true;
    },
    notiLoadingEnd(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = false;
    },
    notiReceived(state, action) {
      state.noti = action.payload;
    },
    notiLogout(state) {
      state.loading = initialState.loading;
      state.noti = initialState.noti;
    },
  },
});

// // Action creators are generated for each case reducer function
// Destructure and export the plain action creators
export const {
  notiLoading,
  notiReceived,
  notiLogout,
  notiLoadingEnd,
} = unseenNotiSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchNoti = () => async (dispatch) => {
  dispatch(notiLoading());
  try {
    const response = await get("notification/check-seen");
    if (response.data.success) {
      dispatch(notiReceived(response.data.unseen));
    }
  } catch (error) {
    console.log("Failed to get noti", error);
  } finally {
    dispatch(notiLoadingEnd());
  }
};
