// /* eslint-disable react/prop-types */
// import React, { useState } from "react";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import { Applogo } from "../Entryfile/imagepath.jsx";
// import { useForm, Controller } from "react-hook-form";

// import { useHistory } from "react-router-dom";
// import axios from "axios";

// const Registrationpage = (props) => {
//   const [eye, seteye] = useState(true);
//   const history = useHistory();

//   const {
//     handleSubmit,
//     control,
//     setError,
//     clearErrors,
//     formState: { errors },
//   } = useForm({
//     // resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       // const response = await axios.post('http://192.168.1.158:8000/api/users/register/', {
//       const response = await axios.post(
//         "http://103.86.182.148:8000/api/users/register/",
//         {
//           email: data.email,
//           first_name: data.first_name,
//           last_name: data.last_name,
//           password: data.password,
//           company: { name: data.company_name },
//         }
//       );
//       if (response && response.data) {
//         console.log("User registered successfully:", response.data);
//         history.push("/login");
//       } else {
//         console.error("Unexpected response structure", response);
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error("Error registering user:", error.response.data);
//       } else {
//         console.error("Error registering user:", error.message);
//       }
//     }
//   };

//   const onEyeClick = () => {
//     seteye(!eye);
//   };
//   return (
//     <div className="account-page">
//       <div className="main-wrapper">
//         <Helmet>
//           <title>Register - HRMS Admin Template</title>
//           <meta name="description" content="Login page" />
//         </Helmet>
//         <div className="account-content">
//           <div className="container">
//             {/* Account Logo */}
//             <div className="account-logo">
//               <Link to="/app/main/dashboard">
//                 <img src={Applogo} alt="Dreamguy's Technologies" />
//               </Link>
//             </div>
//             {/* /Account Logo */}
//             <div className="account-box">
//               <div className="account-wrapper">
//                 <h3 className="account-title">Register</h3>
//                 <p className="account-subtitle">Access to our dashboard</p>
//                 {/* Account Form */}
//                 <div>
//                   <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="input-block">
//                       <label>Company Name</label>
//                       <Controller
//                         name="company_name"
//                         control={control}
//                         render={({ field: { value, onChange } }) => (
//                           <input
//                             className="form-control"
//                             type="text"
//                             value={value}
//                             onChange={onChange}
//                             autoComplete="off"
//                           />
//                         )}
//                       />
//                     </div>
//                     <div className="input-block">
//                       <label>Email</label>
//                       <Controller
//                         name="email"
//                         control={control}
//                         render={({ field: { value, onChange } }) => (
//                           <input
//                             className={`form-control ${
//                               errors?.email ? "error-input" : ""
//                             }`}
//                             type="email"
//                             value={value}
//                             onChange={onChange}
//                             autoComplete="off"
//                           />
//                         )}
//                       />
//                       <small>{errors?.email?.message}</small>
//                     </div>
//                     <div className="input-block">
//                       <label>First Name</label>
//                       <Controller
//                         name="first_name"
//                         control={control}
//                         render={({ field: { value, onChange } }) => (
//                           <input
//                             className={`form-control ${
//                               errors?.first_name ? "error-input" : ""
//                             }`}
//                             type="text"
//                             value={value}
//                             onChange={onChange}
//                             autoComplete="off"
//                           />
//                         )}
//                       />
//                       <small>{errors?.first_name?.message}</small>
//                     </div>
//                     <div className="input-block">
//                       <label>Last Name</label>
//                       <Controller
//                         name="last_name"
//                         control={control}
//                         render={({ field: { value, onChange } }) => (
//                           <input
//                             className={`form-control ${
//                               errors?.last_name ? "error-input" : ""
//                             }`}
//                             type="text"
//                             value={value}
//                             onChange={onChange}
//                             autoComplete="off"
//                           />
//                         )}
//                       />
//                       <small>{errors?.last_name?.message}</small>
//                     </div>
//                     <div className="input-block">
//                       <label>Password</label>
//                       <Controller
//                         name="password"
//                         control={control}
//                         render={({ field: { value, onChange } }) => (
//                           <div
//                             className="pass-group"
//                             style={{ position: "relative" }}
//                           >
//                             <input
//                               type={eye ? "password" : "text"}
//                               className={`form-control ${
//                                 errors?.password ? "error-input" : ""
//                               }`}
//                               value={value}
//                               onChange={onChange}
//                               autoComplete="off"
//                             />
//                             <span
//                               style={{
//                                 position: "absolute",
//                                 right: "5%",
//                                 top: "30%",
//                               }}
//                               onClick={onEyeClick}
//                               className={`fa toggle-password ${
//                                 eye ? "fa-eye-slash" : "fa-eye"
//                               }`}
//                             />
//                           </div>
//                         )}
//                       />
//                       <small>{errors?.password?.message}</small>
//                     </div>
//                     <div className="input-block text-center">
//                       <button
//                         className="btn btn-primary account-btn"
//                         type="submit"
//                       >
//                         Register
//                       </button>
//                     </div>
//                   </form>
//                   <div className="account-footer">
//                     <p>
//                       Already have an account? <Link to="/login">Login</Link>
//                     </p>
//                   </div>
//                 </div>
//                 {/* /Account Form */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registrationpage;
