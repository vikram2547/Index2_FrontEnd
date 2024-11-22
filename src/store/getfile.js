import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, GET_API } from "../base_URL/http";
import revertAll from "./action";

const initialState = {
    getfile: null,
};

export const getfile = createSlice({
  name: "getfile",
  initialState,
  reducers: {
  
    postSuccess: (state, action) => {
      state.getfile = action.payload;
    },
   
  },
 
});

// Get profile information data
export const getFile = (token, fileId, page = 1) => async (dispatch) => {
    const localHeader = {
      Authorization: `Token ${token}`,
    };
  
    try {
      const res = await axios({
        method: GET_API,
        url: `${API_HOST}scan/file-process/${fileId}/`,
        headers: localHeader,
        params: { page }, 
      });
  
      dispatch(postSuccess(res?.data));
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  

export const { postSuccess } = getfile.actions;
export default getfile.reducer;
