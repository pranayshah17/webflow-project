import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  collections: [],
};

export const getCollection = createAsyncThunk(
  "collection/getCollections",
    async (token, userToken, siteId) => {
        try {
        console.log({token, userToken, siteId})
    
    } catch (error) {
      console.log(error,"error getting");
      return error.response.data.message;
    }
  }
);

const GetCollectionSlice = createSlice({
  name: "getCollection",
  initialState,
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    setDefaultCollections: (state, action) => {
      state.defaultCollections = action.payload;
    }
  },
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
export const { setCollections } = GetCollectionSlice.actions;
export const {setDefaultCollections} =GetCollectionSlice.actions

const GetCollectionReducer = GetCollectionSlice.reducer;
export default GetCollectionReducer;
