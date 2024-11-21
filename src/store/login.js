// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, POST_API } from "../base_URL/http";
// import revertAll from "./action";
// import { error } from "ajv/dist/vocabularies/applicator/dependencies";

// const initialState = {
//   loginData: null,
//   errorMessage: null,
//   token: null,
//   user: null,
// };


// export const login = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     logintoken: (state, action) => {
//       state.token = action.payload.token;
//     },
//     postSuccess: (state, action) => {
//       state.token = action.payload?.token;
//       state.user = action.payload?.user;
//     },
//     postErrorAdd: (state, action) => {
//       state.errorMessage = action.payload;
//     },

//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });


// // get Login data
// export const getLoginData = (data) => async (dispatch) => {
//   const localHeader = {
//   };
//   try {
//     const res = await axios({
//       method: POST_API,
//       url: API_HOST + `users/login/`,
//       headers: localHeader,
//       data: data
//     });
//     if (res?.data) {
//       dispatch(postSuccess(res?.data));
//     } else {
//       console.error(error);
//     }
//   } catch (error) {
//     console.error("In get login data error", error);
//   }
// };

// export const { postSuccess, postErrorAdd, logintoken } = login.actions;
// export default login.reducer;
