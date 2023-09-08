import { combineReducers, configureStore } from "@reduxjs/toolkit";


import AddSiteReducer from "../Component/AddSiteSlice";
import GetCollectionReducer from "../Component/GetCollectionSlice";
import UserDetailReducer from "../Component/UserDetailSlice";
import AuthReducer from "../Login/AuthSlice";
import RegisterReducer from "../Login/RegisterSlice";

const rootReducer = combineReducers({
  auth: AuthReducer,
  register:RegisterReducer,
  addSite:AddSiteReducer,
  userDetail: UserDetailReducer,
  getcollection:GetCollectionReducer
});
const store = configureStore({
  reducer: rootReducer,
  // You can add other store configuration options here if needed
});

export default store;