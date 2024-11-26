import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, GET_API } from "../base_URL/http";
import revertAll from "./action";

const initialState = {
    userreject: null,
};

export const userreject = createSlice({
  name: "userreject",
  initialState,
  reducers: {
  
    postSuccess: (state, action) => {
      state.userreject = action.payload;
    },

    ResetRejectedState(state) {
      state.approve = null; 
  },
   
  },
 
});

// Get profile information data
export const UserReject = (token,storedpdfFileId) => async (dispatch) => {
    const localHeader = {
      Authorization: `Token ${token}`,
    };
  
    try {
      const res = await axios({
        method: GET_API,
        url: `${API_HOST}scan//reject_from_dept/${storedpdfFileId}/`,
        headers: localHeader,
      });
  
      dispatch(postSuccess(res?.data));
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  

export const { postSuccess, ResetRejectedState } = userreject.actions;
export default userreject.reducer;
