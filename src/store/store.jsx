import { combineReducers, configureStore } from "@reduxjs/toolkit";


import AddSiteReducer from "../Component/AddSiteSlice";
import UserDetailReducer from "../Component/UserDetailSlice";
import AuthReducer from "../Login/AuthSlice";
import RegisterReducer from "../Login/RegisterSlice";

const rootReducer = combineReducers({
  auth: AuthReducer,
  register:RegisterReducer,
  addSite:AddSiteReducer,
  userDetail:UserDetailReducer
});
const store = configureStore({
  reducer: rootReducer,
  // You can add other store configuration options here if needed
});

export default store;