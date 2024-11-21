// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   assetData: null,
// };

// export const assetSlice = createSlice({
//   name: "assetSlice",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.assetData = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const submitAsset = (token, values) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "post",
//       url: `${API_HOST}employeetracking/assign-asset/`,
//       headers: localHeader,
//       data: values,
//     });
//     dispatch(postSuccess(res?.data));
   
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const { postSuccess } = assetSlice.actions;
// export default assetSlice.reducer;
