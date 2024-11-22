import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../base_URL/http";
import revertAll from "./action";

// Initial state
const initialState = {
  addcropimage: null,
  error: null,
};

// Slice
export const addcropimage = createSlice({
  name: "addcropimage",
  initialState,
  reducers: {
    postSuccess: (state, action) => {
      state.addcropimage = action.payload;
      state.error = null; 
    },
    
    addImageFailure: (state, action) => {
      state.addcropimage = null;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => initialState);
  },
});

// Async thunk action
export const addCroppedImage = (token,data) => async (dispatch) => {
  const localHeader = {
    Authorization: `Token ${token}`,
  };

  try {
    const res = await axios({
      method: "post",
      url: `${API_HOST}scanupload-cropped-image/`,
      headers: localHeader,
      data: data,
    });
    dispatch(postSuccess(res?.data));
    
  } catch (error) {
    console.log("error", error);
    dispatch(addImageFailure(error.response?.data || "An error occurred")); // Dispatch failure action
  }
};

// Export actions and reducer
export const { postSuccess, addImageFailure } = addcropimage.actions;
export default addcropimage.reducer;
