// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//     updateusers: null,
//     error: null,
// };

// export const updateuser = createSlice({
//   name: "updateuser",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.updateusers = action.payload;
//     },
//     updateUserFailure: (state, action) => {
//       state.updateusers = null;
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const updateUser = ({ token, id, values }) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "patch",
//       url: `${API_HOST}users/edit-user/${id}/`,
//       headers: localHeader,
//       data: values,
//     });
//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.log("error", error);
//     dispatch(updateUserFailure(error.response?.data || "An error occurred"));
//   }
// };

// export const { postSuccess,updateUserFailure } = updateuser.actions;
// export default updateuser.reducer;
