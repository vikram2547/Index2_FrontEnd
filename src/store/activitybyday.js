// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   byday: null,
// };

// export const activitybyday = createSlice({
//   name: "activitybyday",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.byday = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const getActivityByDay = (token,id,dayParams) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "get",
//       url: `${API_HOST}employeetracking/filter-activities/${id}/`,
//       headers: localHeader,
//       params: dayParams,
//     });
//     dispatch(postSuccess(res?.data));
   
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const { postSuccess } = activitybyday.actions;
// export default activitybyday.reducer;
