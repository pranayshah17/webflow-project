import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage

import AddSiteReducer from "../Component/AddSiteSlice";
import GetCollectionReducer from "../Component/GetCollectionSlice";
import ListItemsReducer from "../Component/ListItemsSlice";
import UserDetailReducer from "../Component/UserDetailSlice";
import AuthReducer from "../Login/AuthSlice";
import RegisterReducer from "../Login/RegisterSlice";

const persistConfig = {
  key: "root", // You can customize this key
  storage,
  whitelist: ["collection"], // Specify the reducer(s) you want to persist
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  register: RegisterReducer,
  addSite: AddSiteReducer,
  userDetail: UserDetailReducer,
  collection: GetCollectionReducer,
  listItems: ListItemsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  // You can add other store configuration options here if needed
});

export const persistor = persistStore(store);

export default store;
