// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// // Initial state
// const initialState = {
//   addgroups: null,
//   error: null,
// };

// // Slice
// export const addgroup = createSlice({
//   name: "addgroup",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.addgroups = action.payload;
//       state.error = null; 
//     },
    
//     addGroupFailure: (state, action) => {
//       state.addgroups = null;
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// // Async thunk action
// export const addGroup = (token, data) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "post",
//       url: `${API_HOST}users/create-team/`,
//       headers: localHeader,
//       data: data,
//     });
//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.log("error", error);
//     dispatch(addGroupFailure(error.response?.data || "An error occurred")); // Dispatch failure action
//   }
// };

// // Export actions and reducer
// export const { postSuccess, addGroupFailure } = addgroup.actions;
// export default addgroup.reducer;
