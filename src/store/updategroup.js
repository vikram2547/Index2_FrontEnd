// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   updategroups: null,
//   error: null,
// };

// export const updategroup = createSlice({
//   name: "updategroup",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.updategroups = action.payload;
//     },
//     updateGroupFailure: (state, action) => {
//       state.updategroups = null;
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const updateGroup = ({ token, id, values }) => async (dispatch) => {  
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "patch",
//       url: `${API_HOST}users/edit-team/${id}/`,
//       headers: localHeader,
//       data: values,
//     });
//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.log("error", error);
//     dispatch(updateGroupFailure(error.response?.data || "An error occurred")); 
//   }
// };

// export const { postSuccess, updateGroupFailure} = updategroup.actions;
// export default updategroup.reducer;
