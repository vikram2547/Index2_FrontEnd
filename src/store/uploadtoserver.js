import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../base_URL/http";
import revertAll from "./action";

// Initial state
const initialState = {
  uploadtoserver: null,
  error: null,
};

// Slice
export const uploadserver = createSlice({
  name: "uploadserver",
  initialState,
  reducers: {
    postSuccess: (state, action) => {
      state.uploadtoserver = action.payload;
      state.error = null; 
    },
    
    uploadServerFailure: (state, action) => {
      state.uploadtoserver = null;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => initialState);
  },
});

// Async thunk action
export const uploadServer = (token,data) => async (dispatch) => {
  const localHeader = {
    Authorization: `Token ${token}`,
  };

  try {
    const res = await axios({
      method: "post",
      url: `${API_HOST}scan/file-name/`,
      headers: localHeader,
      data: data,
    });
    dispatch(postSuccess(res?.data));
    
  } catch (error) {
    console.log("error", error);
    dispatch(uploadServerFailure(error.response?.data || "An error occurred")); // Dispatch failure action
  }
};

// Export actions and reducer
export const { postSuccess, uploadServerFailure } = uploadserver.actions;
export default uploadserver.reducer;
