import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("authToken") || null,
  responseData: null,
};

export const userRegister = createAsyncThunk(
  "user/signup",
  async ({ firstName, lastName,email,password,confirm_password,phone_number }) => {
    try {
        const response = await axios.post("https://b4f5-122-179-159-67.ngrok-free.app/api/v1/user/signup", {
            email,
            password,firstName,lastName,confirm_password,phone_number
          });
          console.log(response,"---------------")
      const token = response.data?.data;
      return { token, responseData: response.data };
    } catch (error) {
        console.log(error.data.message,"error.data.message")
      return error.data.message;
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("authToken", action.payload);
      } else {
        localStorage.removeItem("authToken");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.responseData = action.payload.responseData;
        if (action.payload.token) {
          localStorage.setItem("authToken", action.payload.token);
        }
      })
      .addCase(userRegister.rejected, (state,action) => {
        state.token = null;
        state.responseData = action.payload;
    });
  },
});

export const { setToken } = registerSlice.actions;

const RegisterReducer = registerSlice.reducer;
export default RegisterReducer;
