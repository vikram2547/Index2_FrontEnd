// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, GET_API } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   empsettings: null,
// };

// export const getempsettings = createSlice({
//   name: "getempsettings",
//   initialState,
//   reducers: {
  
//     postSuccess: (state, action) => {
//       state.empsettings = action.payload;
//     },
   
//   },
 
// });

// // Get profile information data
// export const getEmpSettings = (token, id) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: GET_API,
//       url: `${API_HOST}settings/get-user-settings/${id}/`,
//       headers: localHeader,
//     });

//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.error("Error fetching profile data:", error);
//   }
// };

// export const { postSuccess, postErrorAdd } = getempsettings.actions;
// export default getempsettings.reducer;
