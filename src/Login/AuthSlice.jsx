import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialToken = localStorage.getItem("authToken");
const initialState = {
  token: initialToken || null,
  responseData: null,
};

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
        const response = await axios.post("https://b4f5-122-179-159-67.ngrok-free.app/api/v1/user/login", {
            email,
            password,
          });
          console.log(response, "------------")
      const token = response.data.user.token;
      console.log(token);
      console.log(response.data.message);
      console.log(token);
      return { token, responseData: response.data };
    } catch (error) {
       
      return error.response.data.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      console.log(action.payload, "---------");
      if (action.payload.token) {
        localStorage.setItem("authToken", action.payload.token);
      } else {
        localStorage.removeItem("authToken");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.responseData = action.payload.responseData;
        if (action.payload.token) {
           localStorage.setItem("authToken", action.payload.token);
        }
      })
      .addCase(userLogin.rejected, (state,action) => {
        state.token = null;
        state.responseData = action.payload;
    });
  },
});

export const { setToken } = authSlice.actions;
const AuthReducer = authSlice.reducer;
export default AuthReducer;
