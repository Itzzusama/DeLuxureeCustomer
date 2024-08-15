import { createSlice } from "@reduxjs/toolkit";
import { get } from "../../services/ApiRequest";

const initialState = {
  loading: false,
  categories: [],
};
// First, define the reducer and action creators via `createSlice`
export const categorySlice = createSlice({
  name: "cat",
  initialState: initialState,
  reducers: {
    catLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = true;
    },
    catLoadingEnd(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = false;
    },
    catReceived(state, action) {
      state.categories = action.payload;
    },
    catLogout(state) {
      state.loading = initialState.loading;
      state.categories = initialState.categories;
    },
  },
});

// // Action creators are generated for each case reducer function
// Destructure and export the plain action creators
export const {
  catLoading,
  catReceived,
  catLogout,
  catLoadingEnd,
} = categorySlice.actions;

// Define a thunk that dispatches those action creators
export const fetchCategories = () => async (dispatch) => {
  dispatch(catLoading());
  try {
    const response = await get("cat/all");
    if (response.data.success) {
      dispatch(catReceived(response.data.categories));
    }
  } catch (error) {
    console.log("Failed to get categories", error);
  } finally {
    dispatch(catLoadingEnd());
  }
};
