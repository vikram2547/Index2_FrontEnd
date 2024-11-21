// // adduser.js
// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";

// const initialState = {
//   user: null,
//   error: null,
// };

// export const adduserSlice = createSlice({
//   name: "adduserSlice",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.error = null;
//     },
//     addUserFailure: (state, action) => {
//       state.user = null;
//       state.error = action.payload;
//     },
//   },
// });
// // Async action to add user data
// export const addUserData = (token, userData) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${API_HOST}users/create/`, userData, {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     });
//     dispatch(setUser(response.data));
//   } catch (error) {
//     console.error("Error adding user:", error);
//     dispatch(addUserFailure(error.response?.data || "An error occurred"));
//   }
// };
// export const { setUser, addUserFailure} = adduserSlice.actions;

// export default adduserSlice.reducer;
