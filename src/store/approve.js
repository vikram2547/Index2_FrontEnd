import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, GET_API, POST_API } from "../base_URL/http";
import revertAll from "./action";

const initialState = {
    approve: null,
};

export const approve = createSlice({
  name: "approve",
  initialState,
  reducers: {
  
    postSuccess: (state, action) => {
      state.approve = action.payload;
    },
    
    ResetApproveState(state) {
      state.approve = null; 
  },
  },
 
});

// Get profile information data
export const Approve = (token, storedpdfFileId) => async (dispatch) => {
    const localHeader = {
      Authorization: `Token ${token}`,
    };
  
    try {
      const res = await axios({
        method: POST_API,
        url: `${API_HOST}scan/approve_file/${storedpdfFileId}/`,
        headers: localHeader,
      });
  
      dispatch(postSuccess(res?.data));
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  

export const { postSuccess, ResetApproveState } = approve.actions;
export default approve.reducer;
