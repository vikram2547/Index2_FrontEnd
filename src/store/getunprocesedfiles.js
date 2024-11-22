import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, GET_API } from "../base_URL/http";
import revertAll from "./action";

const initialState = {
    getunprocessedfiles: null,
};

export const getunprocessedfiles = createSlice({
  name: "getunprocessedfiles",
  initialState,
  reducers: {
  
    postSuccess: (state, action) => {
      state.getunprocessedfiles = action.payload;
    },
   
  },
 
});

// Get profile information data
export const getUnprocessedFiles = (token) => async (dispatch) => {
  const localHeader = {
    Authorization: `Token ${token}`,
  };

  try {
    const res = await axios({
      method: GET_API,
      url: `${API_HOST}scan/get-unprocessed-file/`,
      headers: localHeader,
    });

    dispatch(postSuccess(res?.data));
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

export const { postSuccess } = getunprocessedfiles.actions;
export default getunprocessedfiles.reducer;
