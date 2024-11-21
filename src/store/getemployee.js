// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, GET_API } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//     getemployeelist: null,
// };

// export const getemployee = createSlice({
//   name: "getemployee",
//   initialState,
//   reducers: {
  
//     postSuccess: (state, action) => {
//       state.getemployeelist = action.payload;
//     },
   
//   },
 
// });

// // Get profile information data
// export const getEmployees = (token) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: GET_API,
//       url: `${API_HOST}users/get_employees/`,
//       headers: localHeader,
//     });

//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.error("Error fetching profile data:", error);
//   }
// };

// export const { postSuccess, postErrorAdd } = getemployee.actions;
// export default getemployee.reducer;
