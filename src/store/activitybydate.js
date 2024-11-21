// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   bydate: null,
// };

// export const activitybydate = createSlice({
//   name: "activitybydate",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.bydate = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const getActivityByDate = (token,id,dateRangeParams) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "get",
//       url: `${API_HOST}employeetracking/filter-activities/${id}/`,
//       headers: localHeader,
//       params: dateRangeParams,
//     });
//     dispatch(postSuccess(res?.data));
   
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const { postSuccess } = activitybydate.actions;
// export default activitybydate.reducer;
