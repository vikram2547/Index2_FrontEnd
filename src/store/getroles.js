// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, GET_API } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//     getroles: null,
// };

// export const getroles = createSlice({
//   name: "getroles",
//   initialState,
//   reducers: {
  
//     postSuccess: (state, action) => {
//       state.getroles = action.payload;
//     },
   
//   },
 
// });

// // Get profile information data
// export const getRoles = (token) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: GET_API,
//       url: `${API_HOST}users/get-roles/`,
//       headers: localHeader,
//     });

//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.error("Error fetching profile data:", error);
//   }
// };

// export const { postSuccess, postErrorAdd } = getroles.actions;
// export default getroles.reducer;
