// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   data: null,
// };

// export const allscreenshots = createSlice({
//   name: "allscreenshots",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.data = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const getScreenshots = (token,id) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "get",
//       url: `${API_HOST}employeetracking/get-activity/${id}/`,
//       headers: localHeader,
//     });
//     dispatch(postSuccess(res?.data));
   
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const { postSuccess } = allscreenshots.actions;
// export default allscreenshots.reducer;