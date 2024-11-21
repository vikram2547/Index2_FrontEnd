// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   addsettings: null,
// };

// export const addempsetting = createSlice({
//   name: "addempsetting",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.addsettings = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const addEmpSettings = (token, formData) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "post",
//       url: `${API_HOST}settings/user-settings/`,
//       headers: localHeader,
//       data: formData,
//     });
//     dispatch(postSuccess(res?.data));
   
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const { postSuccess } = addempsetting.actions;
// export default addempsetting.reducer;
