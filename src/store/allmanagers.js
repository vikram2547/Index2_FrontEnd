// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   managers: null,
// };

// export const allmanagers = createSlice({
//   name: "allmanagers",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.managers = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const getManagers = (token) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "get",
//       url: `${API_HOST}users/get_managers/`,
//       headers: localHeader,
//     });
//     dispatch(postSuccess(res?.data));
   
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const { postSuccess } = allmanagers.actions;
// export default allmanagers.reducer;
