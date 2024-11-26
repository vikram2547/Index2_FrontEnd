import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, GET_API, POST_API } from "../base_URL/http";
import revertAll from "./action";

const initialState = {
    reject: null,
};

export const reject = createSlice({
  name: "reject",
  initialState,
  reducers: {
  
    postSuccess: (state, action) => {
      state.reject = action.payload;
    },

    ResetRejectedState(state) {
      state.approve = null; 
  },
   
  },
 
});

// Get profile information data
export const Reject = (token,storedpdfFileId) => async (dispatch) => {
    const localHeader = {
      Authorization: `Token ${token}`,
    };
  
    try {
      const res = await axios({
        method: POST_API,
        url: `${API_HOST}scan/reject_file/${storedpdfFileId}/`,
        headers: localHeader,
      });
  
      dispatch(postSuccess(res?.data));
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  

export const { postSuccess, ResetRejectedState } = reject.actions;
export default reject.reducer;
