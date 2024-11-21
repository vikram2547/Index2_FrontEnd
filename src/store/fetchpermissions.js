// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, GET_API } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//     fetchpermissions: null,
// };

// export const fetchpermissions = createSlice({
//   name: "fetchpermissions",
//   initialState,
//   reducers: {
  
//     postSuccess: (state, action) => {
//       state.fetchpermissions = action.payload;
//     },
   
//   },
 
// });

// // Get profile information data
// export const fetchPermissions = (token,roleId) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: GET_API,
//       url: `${API_HOST}users/get-role-info/${roleId}/`,
//       headers: localHeader,
//     });

//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.error("Error fetching profile data:", error);
//   }
// };

// export const { postSuccess, postErrorAdd } = fetchpermissions.actions;
// export default fetchpermissions.reducer;
