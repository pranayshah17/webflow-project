import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data:[]
};

export const userDetail = createAsyncThunk(
  "wfUser/getWfDetails",
  async (token) => {
    try {
        const headers = {
          Authorization: token,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        };
        const response = await axios.get("https://b4f5-122-179-159-67.ngrok-free.app/api/v1/wfUser/getWfDetails", {
           headers:headers
          });
          console.log(response.data , "===> hello pranay")
          console.log(response, "hellooooooooo");
          return  response.data;
    } catch (error) {
       console.log(error);
      return error.response.data.message;
    }
  }
);

const UserDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userDetail.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.responseData = action.payload.responseData;
        if (action.payload.token) {
          localStorage.setItem("authToken", action.payload.token);
        }
      })
      .addCase(userDetail.rejected, (state,action) => {
        state.token = null;
        state.responseData = action.payload;
    });
  },
});

export const { setToken } = UserDetailSlice.actions;

const UserDetailReducer = UserDetailSlice.reducer;
export default UserDetailReducer;


