// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   addroles: null,
// };

// export const addroles = createSlice({
//   name: "addroles",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.addroles = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const addRoles = (token, data) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "post",
//       url: `${API_HOST}users/role/`,
//       headers: localHeader,
//       data: data,
//     });
//     dispatch(postSuccess(res?.data));
   
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const { postSuccess } = addroles.actions;
// export default addroles.reducer;
