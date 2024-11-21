// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, GET_API } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   errorMessage: null,
//   token: null,
//   profileData: null,
// };

// export const getprofileinfo = createSlice({
//   name: "getprofileinfo",
//   initialState,
//   reducers: {
//     profile: (state, action) => {
//       state.token = action.payload.token;
//     },
//     postSuccess: (state, action) => {
//       state.profileData = action.payload;
//     },
//     postErrorAdd: (state, action) => {
//       state.errorMessage = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// // Get profile information data
// export const getprofileData = (token, id) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: GET_API,
//       url: `${API_HOST}users/get_user_info/${id}/`,
//       headers: localHeader,
//     });

//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.error("Error fetching profile data:", error);
//   }
// };

// export const { postSuccess, postErrorAdd } = getprofileinfo.actions;
// export default getprofileinfo.reducer;
