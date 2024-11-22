import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../base_URL/http";
import revertAll from "./action";

// Initial state
const initialState = {
  addfilenames: null,
  error: null,
};

// Slice
export const addfilename = createSlice({
  name: "addfilename",
  initialState,
  reducers: {
    postSuccess: (state, action) => {
      state.addfilenames = action.payload;
      state.error = null; 
    },
    
    addFileFailure: (state, action) => {
      state.addfilenames = null;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => initialState);
  },
});

// Async thunk action
export const addFileName = (data) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

  try {
    const res = await axios({
      method: "post",
      url: `${API_HOST}scan/file-name/`,
    //   headers: localHeader,
      data: data,
    });
    dispatch(postSuccess(res?.data));
  } catch (error) {
    console.log("error", error);
    dispatch(addFileFailure(error.response?.data || "An error occurred")); // Dispatch failure action
  }
};

// Export actions and reducer
export const { postSuccess, addFileFailure } = addfilename.actions;
export default addfilename.reducer;
