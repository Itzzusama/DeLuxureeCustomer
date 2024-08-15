import { combineReducers } from "redux";

import { usersSlice } from "./usersSlice";
import { unseenNotiSlice } from "./unseenNotiSlice";
import { categorySlice } from "./categorySlice";
import { servicesSlice } from "./servicesSlice";

export const rootReducer = combineReducers({
  user: usersSlice.reducer,
  noti: unseenNotiSlice.reducer,
  categories: categorySlice.reducer,
  services: servicesSlice.reducer,
  noti: unseenNotiSlice.reducer,
});
