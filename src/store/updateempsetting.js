// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   updatesetting: null,
// };

// export const updateempsetting = createSlice({
//   name: "updateempsetting",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.updatesetting = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const updateEmpSettings = ({token, id, updateData}) => async (dispatch) => {

//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "patch",
//       url: `${API_HOST}settings/edit-user-settings/${id}/`,
//       headers: localHeader,
//       data: updateData,
//     });
//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const { postSuccess } = updateempsetting.actions;
// export default updateempsetting.reducer;
