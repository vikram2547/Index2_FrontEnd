// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_HOST, POST_API } from "../base_URL/http";
// import revertAll from "./action";

// const initialState = {
//   employeeData: [],
//   errorMessage: null,
//   token: null,
// };

// const allemployee = createSlice({
//   name: "allemployee",
//   initialState,
//   reducers: {
//     profile: (state, action) => {
//       state.token = action.payload.token;
//     },
//     postSuccess: (state, action) => {
//       state.employeeData = action.payload;
//     },
//     postErrorAdd: (state, action) => {
//       state.errorMessage = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(revertAll, () => initialState);
//   },
// });

// export const getallemployeeData = (token) => async (dispatch) => {
//   const socket = new WebSocket(
//     `ws://103.86.182.148:8000/ws/user-list/?token=${token}`
//   );

//   socket.onopen = () => {
//     console.log("WebSocket connection established");
//   };

//   socket.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     if (data) {
//       dispatch(postSuccess(data));
//     } else {
//       console.error("Error receiving employee data");
//     }
//   };

//   socket.onerror = (error) => {
//     console.error("WebSocket error", error);
//     dispatch(postErrorAdd("WebSocket error occurred"));
//   };

//   socket.onclose = (event) => {
//     if (event.wasClean) {
//       console.log(
//         `WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`
//       );
//     } else {
//       console.error("WebSocket connection closed unexpectedly");
//       dispatch(postErrorAdd("WebSocket connection closed unexpectedly"));
//     }
//   };
// };

// export const { postSuccess, postErrorAdd, profile } = allemployee.actions;
// export default allemployee.reducer;
