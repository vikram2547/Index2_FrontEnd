import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, GET_API } from "../base_URL/http";
import revertAll from "./action";

const initialState = {
    userapprove: null,
};

export const userapprove = createSlice({
  name: "userapprove",
  initialState,
  reducers: {
  
    postSuccess: (state, action) => {
      state.userapprove = action.payload;
    },
    
    ResetApproveState(state) {
      state.approve = null; 
  },
  },
 
});

// Get profile information data
export const UserApprove = (token, storedpdfFileId) => async (dispatch) => {
    const localHeader = {
      Authorization: `Token ${token}`,
    };
  
    try {
      const res = await axios({
        method: GET_API,
        url: `${API_HOST}scan/approve_from_dept/${storedpdfFileId}/`,
        headers: localHeader,
      });
  
      dispatch(postSuccess(res?.data));
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  

export const { postSuccess, ResetApproveState } = userapprove.actions;
export default userapprove.reducer;
