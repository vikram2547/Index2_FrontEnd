import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, GET_API } from "../base_URL/http";
import revertAll from "./action";

const initialState = {
    getprocessedfile: null,
};

export const getprocessedfile = createSlice({
  name: "getprocessedfile",
  initialState,
  reducers: {
  
    postSuccess: (state, action) => {
      state.getprocessedfile = action.payload;
    },
   
  },
 
});

// Get profile information data
export const getProcessedFile = (token) => async (dispatch) => {
  const localHeader = {
    Authorization: `Token ${token}`,
  };

  try {
    const res = await axios({
      method: GET_API,
      url: `${API_HOST}scan/processed_files/`,
      headers: localHeader,
    });

    dispatch(postSuccess(res?.data));
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

export const { postSuccess } = getprocessedfile.actions;
export default getprocessedfile.reducer;
