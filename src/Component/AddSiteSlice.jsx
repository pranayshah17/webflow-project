import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data:[]
};

export const addSiteDetail = createAsyncThunk(
  "wfUser/authorize",
  async (token) => {
    try {
        const headers = {
          Authorization: token,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        };
        const response = await axios.get("https://b4f5-122-179-159-67.ngrok-free.app/api/v1/wfUser/authorize", {
           headers:headers
          });
          console.log(response.data , "===> hello Amaan ")
          console.log(response, "hellooooooooo");
          return  response.data;
    } catch (error) {
       console.log(error);
      return error.response.data.message;
    }
  }
);

const AddSiteSlice = createSlice({
  name: "addSite",
  initialState,
//   reducers: {
//     setToken(state, action) {
//       state.token = action.payload;
//       console.log(action.payload, "---------");
//       if (action.payload.token) {
//         localStorage.setItem("authToken", action.payload);
//       } else {
//         localStorage.removeItem("authToken");
//       }
//     },
//   },
  extraReducers: (builder) => {
    builder
      .addCase(addSiteDetail.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.responseData = action.payload.responseData;
        if (action.payload.token) {
          localStorage.setItem("authToken", action.payload.token);
        }
      })
      .addCase(addSiteDetail.rejected, (state,action) => {
        state.token = null;
        state.responseData = action.payload;
    });
  },
});

export const { setToken } = AddSiteSlice.actions;

const AddSiteReducer = AddSiteSlice.reducer;
export default AddSiteReducer;
