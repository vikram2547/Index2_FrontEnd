// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//     updatepermissions: null,
// };

// export const updatepermissions = createSlice({
//   name: "updatepermissions",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.updatepermissions = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const updatePermissions = ({token, selectedRoleId, updateData}) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };

//   try {
//     const res = await axios({
//       method: "patch",
//       url: `${API_HOST}users/edit-role/${selectedRoleId}/`,
//       headers: localHeader,
//       data: updateData,
//     });
//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const { postSuccess } = updatepermissions.actions;
// export default updatepermissions.reducer;
