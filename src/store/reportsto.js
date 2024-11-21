// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, GET_API } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//     loginData: null,
//     errorMessage: null,
//     token: null,
//     users: [], 
// };

// export const reportsto = createSlice({
//     name: "reportsto",
//     initialState,
//     reducers: {
//         logintoken: (state, action) => {
//             state.token = action.payload.token;
//         },
//         postSuccess: (state, action) => {
//             state.users = action.payload; 
//         },
//         postErrorAdd: (state, action) => {
//             state.errorMessage = action.payload;
//         },  
//     },
//     extraReducers: (builder) => {
//         builder.addCase(revertAll, () => initialState);
//     },
// });

// // Async action to fetch report data
// export const getreportData = (token) => async (dispatch) => {
//     const localHeader = {
//         Authorization: `Token ${token}`,
//     };
//     try {
//         const res = await axios({
//             method: GET_API, 
//             url: API_HOST + `users/get_users/`, 
//             headers: localHeader,
//         });
//         dispatch(postSuccess(res?.data)); 
//         console.log(res, "data from API");
//     } catch (error) {
//         console.error("Error fetching report data:", error);
//     }
// };

// export const { postSuccess, postErrorAdd, logintoken } = reportsto.actions;
// export default reportsto.reducer;