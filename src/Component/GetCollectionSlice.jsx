import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const getCollection = createAsyncThunk(
  "collection/getCollections",
    async (token, userToken, siteId) => {
        try {
        console.log({token, userToken, siteId})
    //   const headers = {
    //       Authorization: token,
    //       'wfauthorization': userToken,
    //     "Content-Type": "application/json",
    //     "ngrok-skip-browser-warning": true,
    //   };
    //   const response = await axios.get(
    //     `https://b4f5-122-179-159-67.ngrok-free.app/api/v1/collection/getCollections?siteId=${siteId}`,
    //     {
    //       headers: headers,
    //     }
    //   );
    //   console.log(response.data, "===> hello Amaan ");
    //     console.log(response, "hellooooooooo");
    //     console.log(token, "am i getting token?");
    //   return response.data;
    } catch (error) {
      console.log(error,"error getting");
      return error.response.data.message;
    }
  }
);

const GetCollectionSlice = createSlice({
  name: "getCollection",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCollection.fulfilled, (state, action) => {
        state.token = action.payload.token;
          state.responseData = action.payload.responseData;
        if (action.payload.token) {
          localStorage.setItem("authToken", action.payload.token);
        }
      })
      .addCase(getCollection.rejected, (state, action) => {
        state.token = null;
        state.responseData = action.payload;
      });
  },
});

export const { setToken } = GetCollectionSlice.actions;

const GetCollectionReducer = GetCollectionSlice.reducer;
export default GetCollectionReducer;
