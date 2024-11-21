// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, GET_API, PATCH_API, POST_API } from "../config/https";
// import { revertAll, revertBranch } from "./action";

// const initialState = {
//   branchData: null,
//   errorMessage: null,
//   branchlist: null,
// };

// export const branch = createSlice({
//   name: "branch",
//   initialState,
//   reducers: {
//     postSuccess: (state, action) => {
//       state.branchData = action.payload;
//     },
//     postErrorAdd: (state, action) => {
//       state.errorMessage = action.payload;
//     },
//     getBranch: (state, action) => {
//       state.branchlist = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//     builder.addCase(revertBranch, () => initialState);
//   },
// });

// // get all branch data
// export const getbranchData = (token) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };
//   try {
//     const res = await axios({
//       method: GET_API,
//       url: API_HOST + `/company/api/v2/branch/`,
//       headers: localHeader,
//     });
//     dispatch(postSuccess(res?.data));
//   } catch (error) {
//     console.error("In branchList error", error);
//   }
// };

// // add branch data
// export const addBranchData =
//   (token, branch_data, setShowAddMsg) => async (dispatch) => {
//     const localHeader = {
//       Authorization: `Token ${token}`,
//     };
//     const bodyData = branch_data;
//     try {
//       const res = await axios({
//         method: POST_API,
//         url: API_HOST + `/company/api/v2/branch/`,
//         headers: localHeader,
//         data: bodyData,
//       });
//       setShowAddMsg(true);
//     } catch (error) {
//       dispatch(postErrorAdd(error?.response));
//       console.error("In Add branchList error", error);
//     }
//   };

// // Branch dropdown data
// export const getbranchlist = (token) => async (dispatch) => {
//   const localHeader = {
//     Authorization: `Token ${token}`,
//   };
//   try {
//     const res = await axios({
//       method: GET_API,
//       url: API_HOST + `/company/api/v2/branchnovalidation/?active_branch=True`,
//       headers: localHeader,
//     });
//     dispatch(getBranch(res?.data));
//   } catch (error) {
//     console.error("In get branch dropdown data error", error);
//   }
// };

// // Update Branch data
// export const updateBranchData =
//   (token, id, branchData, setShowUpdateMsg) => async (dispatch) => {
//     const localHeader = {
//       Authorization: `Token ${token}`,
//     };
//     const bodyData = branchData;
//     try {
//       const res = await axios({
//         method: PATCH_API,
//         url: API_HOST + `/company/api/v2/branch/${id}/`,
//         headers: localHeader,
//         data: bodyData,
//       });
//       setShowUpdateMsg(true);
//       dispatch(getbranchData(token));
//     } catch (error) {
//       console.error("In update branch error", error);
//     }
//   };

// export const { postSuccess, getBranch, postErrorAdd } = branch.actions;
// export default branch.reducer;