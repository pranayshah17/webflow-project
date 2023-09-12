
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  collections: [],
  selectedCollections: [],
  listItems: [],
  status: "idle", 
  error: null,
};


export const fetchListItems = createAsyncThunk(
  "collections/fetchListItems",
  async (selectedCollections, { rejectWithValue }) => {
    try {
      // Replace with your API endpoint
      const apiUrl = `https://your-api-endpoint/items?collections=${selectedCollections.join(",")}`;
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice
const ListItemsSlice = createSlice({
  name: "ListItems",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listItems = action.payload;
      })
      .addCase(fetchListItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});



const ListItemsReducer = ListItemsSlice.reducer;
export default ListItemsReducer;
