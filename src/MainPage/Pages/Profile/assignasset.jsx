// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useHistory } from "react-router-dom";
// import { submitAsset } from "../../../store/assetSlice";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";

// const AssignAsset = () => {
//   const history = useHistory();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.login.token);
//   const assetSelector = useSelector((state) => state.assetSlice.assetData);

//   const [formData, setFormData] = useState({
//     vendor: "",
//     cost: "",
//     brand: "",
//     assetImage1: null,
//     assetImage2: null,
//     assetImage3: null,
//     assetImage4: null,
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const values = new FormData();
//     values.append("vendor", formData.vendor);
//     values.append("cost", formData.cost);
//     values.append("brand", formData.brand);
//     values.append("asset_image_1", formData.assetImage1);
//     values.append("asset_image_2", formData.assetImage2);
//     values.append("asset_image_3", formData.assetImage3);
//     values.append("asset_image_4", formData.assetImage4);
//     values.append("user", id);

//     dispatch(submitAsset(token, values));
//     setSubmitted(true);
//   };

//   useEffect(() => {
//     if (submitted && assetSelector?.asset_id) {
//       alert("Asset assigned successfully");
//       history.push(`/app/profile/employee-profile/${id}`);
//     }
//   }, [submitted, assetSelector, history, id]);

//   return (
//     <div className="page-wrapper">
//       <Helmet>
//         <title>Employee Profile - HRMS admin Template</title>
//         <meta name="description" content="Reactify Blank Page" />
//       </Helmet>
//       <div className="content container-fluid">
//         {/* Page Header */}
//         <div className="page-header">
//           <div className="row">
//             <div className="col-sm-12">
//               <h3 className="page-title">Profile</h3>
//               <ul className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <Link to="/app/main/dashboard">Dashboard</Link>
//                 </li>
//                 <li className="breadcrumb-item active">Assets</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         {/* /Page Header */}
//         <div className="float-end">
//           {" "}
//           <Link
//             to={`/app/profile/employee-profile/${id}`}
//             className="btn btn-primary"
//           >
//             Back
//           </Link>
//         </div>
//         <br></br>
//         <br></br>

//         <div className="row">
//           <div className="col-xl-12 d-flex">
//             <div className="card flex-fill">
//               <div className="card-header">
//                 <h4 className="card-title mb-0">Asset Form</h4>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="input-block row">
//                     <label className="col-lg-3 col-form-label">Vendor</label>
//                     <div className="col-lg-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="vendor"
//                         value={formData.vendor}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="input-block row">
//                     <label className="col-lg-3 col-form-label">Cost</label>
//                     <div className="col-lg-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="cost"
//                         value={formData.cost}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="input-block row">
//                     <label className="col-lg-3 col-form-label">Brand</label>
//                     <div className="col-lg-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="brand"
//                         value={formData.brand}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="input-block row">
//                     <label className="col-lg-3 col-form-label">
//                       Asset Image 1
//                     </label>
//                     <div className="col-lg-9">
//                       <input
//                         className="form-control"
//                         type="file"
//                         name="assetImage1"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="input-block row">
//                     <label className="col-lg-3 col-form-label">
//                       Asset Image 2
//                     </label>
//                     <div className="col-lg-9">
//                       <input
//                         className="form-control"
//                         type="file"
//                         name="assetImage2"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="input-block row">
//                     <label className="col-lg-3 col-form-label">
//                       Asset Image 3
//                     </label>
//                     <div className="col-lg-9">
//                       <input
//                         className="form-control"
//                         type="file"
//                         name="assetImage3"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="input-block row">
//                     <label className="col-lg-3 col-form-label">
//                       Asset Image 4
//                     </label>
//                     <div className="col-lg-9">
//                       <input
//                         className="form-control"
//                         type="file"
//                         name="assetImage4"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <button type="submit" className="btn btn-primary">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssignAsset;
