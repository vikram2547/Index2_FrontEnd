// /* eslint-disable no-undef */
// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   Avatar_02,
//   eye,
//   icon01,
//   icon03,
//   icon05,
// } from "../../../Entryfile/imagepath";
// import Offcanvas from "../../../Entryfile/offcanvance";
// import { getprofileData } from "../../../store/getprofileinfo";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { useForm } from "react-hook-form";
// import { updateEmpSettings } from "../../../store/updateempsetting";
// import { addEmpSettings } from "../../../store/addempsetting";
// import { getEmpSettings } from "../../../store/getempsettings";

// const EmployeeProfile = () => {
//   const params = useParams();
//   const { id } = params;
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const [selectedSetting, setSelectedSetting] = useState(null);
//   const info = useSelector((state) => state.getprofileinfo.profileData);
//   const token = useSelector((state) => state.login.token);
//   const add = useSelector((state) => state.addempsetting.addsettings);
//   const update = useSelector((state) => state.updateempsetting.updatesetting);
//   const empsettings = useSelector((state) => state.getempsettings.empsettings);
//   const [userSetting, setUserSetting] = useState(null);
//   const groupSetting = empsettings?.group_setting;

//   const { register, handleSubmit, setValue, reset } = useForm();
//   const { register: registerUpdate, handleSubmit: handleUpdate } = useForm();

//   const convertIntervalToDjangoFormat = (interval) => {
//     switch (interval) {
//       case "1m":
//         return "0:01:00";
//       case "5m":
//         return "0:05:00";
//       case "10m":
//         return "0:10:00";
//       case "15m":
//         return "0:15:00";
//       case "30m":
//         return "0:30:00";
//       case "1h":
//         return "1:00:00";
//       default:
//         return interval;
//     }
//   };

//   useEffect(() => {
//     if ($(".select").length > 0) {
//       $(".select").select2({
//         minimumResultsForSearch: -1,
//         width: "100%",
//       });
//     }
//   });

//   useEffect(() => {
//     if (empsettings?.user_setting.user === parseInt(id)) {
//       setUserSetting(empsettings?.user_setting);
//     } else {
//       setUserSetting(null);
//     }
//   }, [empsettings, id]);

//   useEffect(() => {
//     if (token && id) {
//       dispatch(getEmpSettings(token, id));
//       dispatch(getprofileData(token, id)).finally(() => {
//         setLoading(false);
//       });
//     } else {
//       setLoading(false);
//     }
//   }, [dispatch, token, id]);

//   useEffect(() => {
//     if (add || update) {
//       dispatch(getEmpSettings(token, id));
//     }
//   }, [add, update, dispatch, token, id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!info || !info.user) {
//     console.error("User data not available or is null:", info);
//     return <div>User data not available</div>;
//   }

//   const {
//     email,
//     first_name,
//     last_name,
//     profile_picture,
//     phone,
//     address,
//     gender,
//     employee_id,
//     company,
//   } = info.user || {};

//   const handleViewClick = (asset) => {
//     setSelectedAsset(asset);
//     setShowModal(true);
//   };
//   const handleClose = () => setShowModal(false);

//   const handleFormSubmit = async (data) => {
//     const formData = {
//       ...data,
//       user: id,
//       screenshot_interval: convertIntervalToDjangoFormat(
//         data.screenshot_interval
//       ),
//     };
//     dispatch(addEmpSettings(token, formData));
//     reset();
//   };

//   const onEdit = (settings) => {
//     setSelectedSetting(settings);
//     setValue("shift_start", settings.shift_start);
//     setValue("shift_end", settings.shift_end);
//     setValue("blurred_screenshots", settings.blurred_screenshots);
//     setValue("screenshot_interval", settings.screenshot_interval);
//     setValue("track_according_to_shift", settings.track_according_to_shift);
//     setValue("productive_tab", settings.productive_tab);
//     setValue("non_productive_tab", settings.non_productive_tab);
//   };

//   const onUpdate = (data) => {
//     const updateData = {
//       ...data,
//       user: id,
//       screenshot_interval: convertIntervalToDjangoFormat(
//         data.screenshot_interval
//       ),
//     };
//     dispatch(updateEmpSettings({ token, id: selectedSetting.id, updateData }));

//     reset();
//   };
//   return (
//     <>
//       <div className="page-wrapper">
//         <Helmet>
//           <title>Employee Profile - HRMS admin Template</title>
//           <meta name="description" content="Reactify Blank Page" />
//         </Helmet>
//         {/* Page Content */}
//         <div className="content container-fluid">
//           {/* Page Header */}
//           <div className="page-header">
//             <div className="row">
//               <div className="col-sm-12">
//                 <h3 className="page-title">Profile</h3>
//                 <ul className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <Link to="/app/main/dashboard">Dashboard</Link>
//                   </li>
//                   <li className="breadcrumb-item active">Profile</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           {/* /Page Header */}
//           <div className="card mb-0">
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-12">
//                   <div className="profile-view">
//                     <div className="profile-img-wrap">
//                       <div className="profile-img">
//                         <Link to="#">
//                           <img
//                             src={
//                               profile_picture
//                                 ? `http://103.86.182.148:8000${profile_picture}`
//                                 : "path_to_placeholder_image"
//                             }
//                             alt={profile_picture ? "Asset" : "Not Available"}
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                     <div className="profile-basic">
//                       <div className="row">
//                         <div className="col-md-5">
//                           <div className="profile-info-left">
//                             <h3 className="user-name m-t-0 mb-0">
//                               {first_name && <span> {first_name}</span>}
//                               {last_name && <span> {last_name}</span>}
//                             </h3>

//                             <div className="staff-id">
//                               {employee_id && (
//                                 <span>Employee ID: {employee_id}</span>
//                               )}
//                             </div>
//                             <div className="staff-msg">
//                               <Link
//                                 onClick={() =>
//                                   localStorage.setItem("minheight", "true")
//                                 }
//                                 className="btn btn-custom"
//                                 to={`/app/profile/employee-activity/${id}`}
//                               >
//                                 Activities
//                               </Link>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="col-md-7">
//                           <div className="col-md-7">
//                             <ul className="personal-info">
//                               <li>
//                                 <div className="title">Phone:</div>
//                                 <div className="text">
//                                   {phone ? (
//                                     <Link to={`tel:${phone}`}>{phone}</Link>
//                                   ) : (
//                                     "Not available"
//                                   )}
//                                 </div>
//                               </li>
//                               <li>
//                                 <div className="title">Email:</div>
//                                 <div className="text">
//                                   {email ? (
//                                     <Link to={`mailto:${email}`}>{email}</Link>
//                                   ) : (
//                                     "Not available"
//                                   )}
//                                 </div>
//                               </li>
//                               <li>
//                                 <div className="title">Address:</div>
//                                 <div className="text">
//                                   {address ? address : "Not available"}
//                                 </div>
//                               </li>
//                               <li>
//                                 <div className="title">Gender:</div>
//                                 <div className="text">
//                                   {gender
//                                     ? gender === "M"
//                                       ? "Male"
//                                       : "Female"
//                                     : "Not available"}
//                                 </div>
//                               </li>
//                               <li>
//                                 <div className="title">Company:</div>
//                                 <div className="text">
//                                   {company?.name
//                                     ? company.name
//                                     : "Not available"}
//                                 </div>
//                               </li>
//                               <li>
//                                 <div className="title">Reports to:</div>
//                                 <div className="text">
//                                   {company?.reports_to
//                                     ? company.reports_to
//                                     : "Not available"}
//                                 </div>
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="card tab-box">
//             <div className="row user-tabs">
//               <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
//                 <ul className="nav nav-tabs nav-tabs-bottom">
//                   {/* <li className="nav-item">
//                     <Link
//                       to="#emp_profile"
//                       data-bs-toggle="tab"
//                       className="nav-link active"
//                     >
//                       Profile
//                     </Link>
//                   </li> */}

//                   <li className="nav-item">
//                     <Link
//                       to="#emp_assets"
//                       data-bs-toggle="tab"
//                       className="nav-link active"
//                     >
//                       Assets
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link
//                       to="#emp_settings"
//                       data-bs-toggle="tab"
//                       className="nav-link"
//                     >
//                       Settings
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="tab-content">
//             {/* Profile Info Tab */}
//             {/* <div
//               id="emp_profile"
//               className="pro-overview tab-pane fade show active"
//             >
//               <div className="row">
//                 <div className="col-md-6 d-flex">
//                   <div className="card profile-box flex-fill">
//                     <div className="card-body">
//                       <h3 className="card-title">
//                         Personal Informations{" "}
//                         <Link
//                           to="#"
//                           className="edit-icon"
//                           data-bs-toggle="modal"
//                           data-bs-target="#personal_info_modal"
//                         >
//                           <i className="fa fa-pencil" />
//                         </Link>
//                       </h3>
//                       <ul className="personal-info">
//                         <li>
//                           <div className="title">Passport No.</div>
//                           <div className="text">9876543210</div>
//                         </li>
//                         <li>
//                           <div className="title">Passport Exp Date.</div>
//                           <div className="text">9876543210</div>
//                         </li>
//                         <li>
//                           <div className="title">Tel</div>
//                           <div className="text">
//                             <Link to="#">9876543210</Link>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="title">Nationality</div>
//                           <div className="text">Indian</div>
//                         </li>
//                         <li>
//                           <div className="title">Religion</div>
//                           <div className="text">Christian</div>
//                         </li>
//                         <li>
//                           <div className="title">Marital status</div>
//                           <div className="text">Married</div>
//                         </li>
//                         <li>
//                           <div className="title">Employment of spouse</div>
//                           <div className="text">No</div>
//                         </li>
//                         <li>
//                           <div className="title">No. of children</div>
//                           <div className="text">2</div>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6 d-flex">
//                   <div className="card profile-box flex-fill">
//                     <div className="card-body">
//                       <h3 className="card-title">
//                         Emergency Contact{" "}
//                         <Link
//                           to="#"
//                           className="edit-icon"
//                           data-bs-toggle="modal"
//                           data-bs-target="#emergency_contact_modal"
//                         >
//                           <i className="fa fa-pencil" />
//                         </Link>
//                       </h3>
//                       <h5 className="section-title">Primary</h5>
//                       <ul className="personal-info">
//                         <li>
//                           <div className="title">Name</div>
//                           <div className="text">John Doe</div>
//                         </li>
//                         <li>
//                           <div className="title">Relationship</div>
//                           <div className="text">Father</div>
//                         </li>
//                         <li>
//                           <div className="title">Phone </div>
//                           <div className="text">9876543210, 9876543210</div>
//                         </li>
//                       </ul>
//                       <hr />
//                       <h5 className="section-title">Secondary</h5>
//                       <ul className="personal-info">
//                         <li>
//                           <div className="title">Name</div>
//                           <div className="text">Karen Wills</div>
//                         </li>
//                         <li>
//                           <div className="title">Relationship</div>
//                           <div className="text">Brother</div>
//                         </li>
//                         <li>
//                           <div className="title">Phone </div>
//                           <div className="text">9876543210, 9876543210</div>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6 d-flex">
//                   <div className="card profile-box flex-fill">
//                     <div className="card-body">
//                       <h3 className="card-title">Bank information</h3>
//                       <ul className="personal-info">
//                         <li>
//                           <div className="title">Bank name</div>
//                           <div className="text">ICICI Bank</div>
//                         </li>
//                         <li>
//                           <div className="title">Bank account No.</div>
//                           <div className="text">159843014641</div>
//                         </li>
//                         <li>
//                           <div className="title">IFSC Code</div>
//                           <div className="text">ICI24504</div>
//                         </li>
//                         <li>
//                           <div className="title">PAN No</div>
//                           <div className="text">TC000Y56</div>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6 d-flex">
//                   <div className="card profile-box flex-fill">
//                     <div className="card-body">
//                       <h3 className="card-title">
//                         Family Informations{" "}
//                         <Link
//                           to="#"
//                           className="edit-icon"
//                           data-bs-toggle="modal"
//                           data-bs-target="#family_info_modal"
//                         >
//                           <i className="fa fa-pencil" />
//                         </Link>
//                       </h3>
//                       <div className="table-responsive">
//                         <table className="table table-nowrap">
//                           <thead>
//                             <tr>
//                               <th>Name</th>
//                               <th>Relationship</th>
//                               <th>Date of Birth</th>
//                               <th>Phone</th>
//                               <th />
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td>Leo</td>
//                               <td>Brother</td>
//                               <td>Feb 16th, 2019</td>
//                               <td>9876543210</td>
//                               <td className="text-end">
//                                 <div className="dropdown dropdown-action">
//                                   <Link
//                                     aria-expanded="false"
//                                     data-bs-toggle="dropdown"
//                                     className="action-icon dropdown-toggle"
//                                     to="#"
//                                   >
//                                     <i className="material-icons">more_vert</i>
//                                   </Link>
//                                   <div className="dropdown-menu dropdown-menu-right">
//                                     <Link to="#" className="dropdown-item">
//                                       <i className="fa fa-pencil m-r-5" /> Edit
//                                     </Link>
//                                     <Link to="#" className="dropdown-item">
//                                       <i className="fa fa-trash m-r-5" /> Delete
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6 d-flex">
//                   <div className="card profile-box flex-fill">
//                     <div className="card-body">
//                       <h3 className="card-title">
//                         Education Informations{" "}
//                         <Link
//                           to="#"
//                           className="edit-icon"
//                           data-bs-toggle="modal"
//                           data-bs-target="#education_info"
//                         >
//                           <i className="fa fa-pencil" />
//                         </Link>
//                       </h3>
//                       <div className="experience-box">
//                         <ul className="experience-list">
//                           <li>
//                             <div className="experience-user">
//                               <div className="before-circle" />
//                             </div>
//                             <div className="experience-content">
//                               <div className="timeline-content">
//                                 <Link to="/" className="name">
//                                   International College of Arts and Science (UG)
//                                 </Link>
//                                 <div>Bsc Computer Science</div>
//                                 <span className="time">2000 - 2003</span>
//                               </div>
//                             </div>
//                           </li>
//                           <li>
//                             <div className="experience-user">
//                               <div className="before-circle" />
//                             </div>
//                             <div className="experience-content">
//                               <div className="timeline-content">
//                                 <Link to="/" className="name">
//                                   International College of Arts and Science (PG)
//                                 </Link>
//                                 <div>Msc Computer Science</div>
//                                 <span className="time">2000 - 2003</span>
//                               </div>
//                             </div>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6 d-flex">
//                   <div className="card profile-box flex-fill">
//                     <div className="card-body">
//                       <h3 className="card-title">
//                         Experience{" "}
//                         <Link
//                           to="#"
//                           className="edit-icon"
//                           data-bs-toggle="modal"
//                           data-bs-target="#experience_info"
//                         >
//                           <i className="fa fa-pencil" />
//                         </Link>
//                       </h3>
//                       <div className="experience-box">
//                         <ul className="experience-list">
//                           <li>
//                             <div className="experience-user">
//                               <div className="before-circle" />
//                             </div>
//                             <div className="experience-content">
//                               <div className="timeline-content">
//                                 <Link to="/" className="name">
//                                   Web Designer at Zen Corporation
//                                 </Link>
//                                 <span className="time">
//                                   Jan 2013 - Present (5 years 2 months)
//                                 </span>
//                               </div>
//                             </div>
//                           </li>
//                           <li>
//                             <div className="experience-user">
//                               <div className="before-circle" />
//                             </div>
//                             <div className="experience-content">
//                               <div className="timeline-content">
//                                 <Link to="/" className="name">
//                                   Web Designer at Ron-tech
//                                 </Link>
//                                 <span className="time">
//                                   Jan 2013 - Present (5 years 2 months)
//                                 </span>
//                               </div>
//                             </div>
//                           </li>
//                           <li>
//                             <div className="experience-user">
//                               <div className="before-circle" />
//                             </div>
//                             <div className="experience-content">
//                               <div className="timeline-content">
//                                 <Link to="/" className="name">
//                                   Web Designer at Dalt Technology
//                                 </Link>
//                                 <span className="time">
//                                   Jan 2013 - Present (5 years 2 months)
//                                 </span>
//                               </div>
//                             </div>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//             {/* /Profile Info Tab */}

//             <div
//               className="pro-overview tab-pane fade show active"
//               id="emp_assets"
//             >
//               <div className="table-responsive table-newdatatable">
//                 <div className="d-flex justify-content-end align-items-center">
//                   <Link
//                     to={`/app/profile/assign-asset/${id}`}
//                     className="btn btn-primary"
//                   >
//                     Assign Asset
//                   </Link>
//                 </div>
//                 <br></br>
//                 <table className="table table-new custom-table mb-0 datatable">
//                   <thead>
//                     <tr>
//                       <th>Sr.No</th>
//                       <th>Asset Picture</th>
//                       <th>Vendor</th>
//                       <th>Brand</th>
//                       <th>Cost</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {info && info.assets && info.assets.length > 0 ? (
//                       info.assets.map((asset, index) => (
//                         <tr key={asset.id}>
//                           <td>{index + 1}</td>
//                           <td className="table-imgname">
//                             <img
//                               src={`http://103.86.182.148:8000${asset.asset_image_1}`}
//                               className="me-2"
//                               alt="Asset"
//                             />
//                           </td>
//                           <td>{asset.vendor || "N/A"}</td>
//                           <td>{asset.brand || "N/A"}</td>
//                           <td>{asset.cost ? `$${asset.cost}` : "N/A"}</td>
//                           <td>
//                             <div className="table-actions d-flex">
//                               <Link
//                                 to="#"
//                                 onClick={() => handleViewClick(asset)}
//                                 className="nav-link active"
//                               >
//                                 <img src={eye} alt="svg" />
//                               </Link>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6">No assets assigned</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="tab-pane fade" id="emp_settings">
//               <div className="table-responsive table-newdatatable">
//                 <div className="d-flex justify-content-end align-items-center">
//                   {!userSetting && (
//                     <button
//                       className="btn btn-primary"
//                       data-bs-toggle="modal"
//                       data-bs-target="#add_emp_settings"
//                       style={{ float: "right" }}
//                     >
//                       Assign User Settings
//                     </button>
//                   )}
//                 </div>
//                 <br />
//                 {userSetting !== null ? (
//                   <div>
//                     <h4>User Settings</h4>
//                     <table className="table table-new custom-table mb-0 datatable">
//                       <thead>
//                         <tr>
//                           <th>Sr.No</th>
//                           <th>Shift Start</th>
//                           <th>Shift End</th>
//                           <th>Blurred Screenshot</th>
//                           <th>Screenshot Interval</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {userSetting ? (
//                           <tr key={userSetting.id}>
//                             <td>1</td>
//                             <td>{userSetting.shift_start || "N/A"}</td>
//                             <td>{userSetting.shift_end || "N/A"}</td>
//                             <td>
//                               {userSetting.blurred_screenshots ? "Yes" : "No"}
//                             </td>
//                             <td>{userSetting.screenshot_interval || "N/A"}</td>
//                             <td>
//                               <div className="table-actions d-flex">
//                                 <Link
//                                   to="#"
//                                   data-bs-toggle="modal"
//                                   data-bs-target="#edit_setting_modal"
//                                   onClick={() => onEdit(userSetting)}
//                                   className="btn btn-sm btn-primary"
//                                 >
//                                   Edit
//                                 </Link>
//                               </div>
//                             </td>
//                           </tr>
//                         ) : (
//                           <tr>
//                             <td colSpan="6">No setting assigned</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <div>
//                     <h4>User Settings</h4>
//                     <table className="table table-new custom-table mb-0 datatable">
//                       <thead>
//                         <tr>
//                           <th>Sr.No</th>
//                           <th>Shift Start</th>
//                           <th>Shift End</th>
//                           <th>Blurred Screenshot</th>
//                           <th>Screenshot Interval</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td colSpan="6">No setting assigned</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 )}

//                 {/* Always show Group Settings Table if userSetting is null */}
//                 {!userSetting ? (
//                   <div>
//                     <br />
//                     <h4>Group Settings</h4>
//                     <table className="table table-new custom-table mb-0 datatable">
//                       <thead>
//                         <tr>
//                           <th>Sr.No</th>
//                           <th>Shift Start</th>
//                           <th>Shift End</th>
//                           <th>Blurred Screenshot</th>
//                           <th>Screenshot Interval</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {groupSetting ? (
//                           <tr key={groupSetting.id}>
//                             <td>1</td>
//                             <td>{groupSetting.shift_start || "N/A"}</td>
//                             <td>{groupSetting.shift_end || "N/A"}</td>
//                             <td>
//                               {groupSetting.blurred_screenshots ? "Yes" : "No"}
//                             </td>
//                             <td>{groupSetting.screenshot_interval || "N/A"}</td>
//                             <td>
//                               <div className="table-actions d-flex">
//                                 <Link
//                                   to="#"
//                                   data-bs-toggle="modal"
//                                   data-bs-target="#edit_setting_modal"
//                                   onClick={() => onEdit(groupSetting)}
//                                 >
//                                   <i /> Edit
//                                 </Link>
//                               </div>
//                             </td>
//                           </tr>
//                         ) : (
//                           <tr>
//                             <td colSpan="6">No settings assigned</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Page Content */}

//         <Modal show={showModal} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>User Assets</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedAsset && (
//               <div className="user_asset">
//                 <div className="assign-head"></div>
//                 <div className="card asset-box">
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-lg-7">
//                         <h5>Asset Info</h5>
//                         <div className="asset-info">
//                           <div className="asset-info-img">
//                             {/* <img
//                               src={`http://192.168.1.47:8001${selectedAsset.asset_image_1}`}
//                               alt="Asset"
//                             /> */}
//                             <img
//                               src={`http://103.86.182.148:8000${selectedAsset.asset_image_1}`}
//                               alt="Asset"
//                             />
//                           </div>
//                         </div>
//                         <div className="assets-image">
//                           <h5>Asset Images</h5>
//                           <ul>
//                             <li>
//                               {/* <img
//                                 src={`http://192.168.1.47:8001${selectedAsset.asset_image_2}`}
//                                 alt="img"
//                               /> */}
//                               <img
//                                 src={`http://103.86.182.148:8000${selectedAsset.asset_image_2}`}
//                                 alt="img"
//                               />
//                             </li>
//                             <li>
//                               {/* <img
//                                 src={`http://192.168.1.47:8001${selectedAsset.asset_image_3}`}
//                                 alt="img"
//                               /> */}
//                               <img
//                                 src={`http://103.86.182.148:8000${selectedAsset.asset_image_3}`}
//                                 alt="img"
//                               />
//                             </li>
//                             <li>
//                               {/* <img
//                                 src={`http://192.168.1.47:8001${selectedAsset.asset_image_4}`}
//                                 alt="img"
//                               /> */}
//                               <img
//                                 src={`http://103.86.182.148:8000${selectedAsset.asset_image_4}`}
//                                 alt="img"
//                               />
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                       <div className="col-lg-5">
//                         <div className="asset-history">
//                           <h5>Asset History</h5>
//                           <ul>
//                             <li>
//                               <div className="aset-img">
//                                 <img src={icon01} alt="img" />
//                               </div>
//                               <div className="asset-inf">
//                                 <h6>Brand</h6>
//                                 <p>{selectedAsset.brand || "N/A"}</p>
//                               </div>
//                             </li>
//                             <li>
//                               <div className="aset-img">
//                                 <img src={icon03} alt="img" />
//                               </div>
//                               <div className="asset-inf">
//                                 <h6>Cost</h6>
//                                 <p>
//                                   {selectedAsset.cost
//                                     ? `$${selectedAsset.cost}`
//                                     : "N/A"}
//                                 </p>
//                               </div>
//                             </li>
//                             <li>
//                               <div className="aset-img">
//                                 <img src={icon05} alt="img" />
//                               </div>
//                               <div className="asset-inf">
//                                 <h6>Vendor</h6>
//                                 <p>{selectedAsset.vendor || "N/A"}</p>
//                               </div>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         {/* Personal Info Modal */}
//         <div
//           id="personal_info_modal"
//           className="modal custom-modal fade"
//           role="dialog"
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Personal Information</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="input-block">
//                         <label>Passport No</label>
//                         <input type="text" className="form-control" />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="input-block">
//                         <label>Passport Expiry Date</label>
//                         <div>
//                           <input
//                             className="form-control datetimepicker"
//                             type="date"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="input-block">
//                         <label>Tel</label>
//                         <input className="form-control" type="text" />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="input-block">
//                         <label>
//                           Nationality <span className="text-danger">*</span>
//                         </label>
//                         <input className="form-control" type="text" />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="input-block">
//                         <label>Religion</label>
//                         <div>
//                           <input className="form-control" type="date" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="input-block">
//                         <label>
//                           Marital status <span className="text-danger">*</span>
//                         </label>
//                         <select className="select form-control">
//                           <option>-</option>
//                           <option>Single</option>
//                           <option>Married</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="input-block">
//                         <label>Employment of spouse</label>
//                         <input className="form-control" type="text" />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="input-block">
//                         <label>No. of children </label>
//                         <input className="form-control" type="text" />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="submit-section">
//                     <button className="btn btn-primary submit-btn">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Personal Info Modal */}
//         {/* Family Info Modal */}
//         <div
//           id="family_info_modal"
//           className="modal custom-modal fade"
//           role="dialog"
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title"> Family Informations</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="form-scroll">
//                     <div className="card">
//                       <div className="card-body">
//                         <h3 className="card-title">
//                           Family Member{" "}
//                           <Link to="#" className="delete-icon">
//                             <i className="fa fa-trash" />
//                           </Link>
//                         </h3>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="input-block">
//                               <label>
//                                 Name <span className="text-danger">*</span>
//                               </label>
//                               <input className="form-control" type="text" />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block">
//                               <label>
//                                 Relationship{" "}
//                                 <span className="text-danger">*</span>
//                               </label>
//                               <input className="form-control" type="text" />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block">
//                               <label>
//                                 Date of birth{" "}
//                                 <span className="text-danger">*</span>
//                               </label>
//                               <input className="form-control" type="text" />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block">
//                               <label>
//                                 Phone <span className="text-danger">*</span>
//                               </label>
//                               <input className="form-control" type="text" />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card">
//                       <div className="card-body">
//                         <h3 className="card-title">
//                           Education Informations{" "}
//                           <Link to="#" className="delete-icon">
//                             <i className="fa fa-trash" />
//                           </Link>
//                         </h3>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="input-block">
//                               <label>
//                                 Name <span className="text-danger">*</span>
//                               </label>
//                               <input className="form-control" type="text" />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block">
//                               <label>
//                                 Relationship{" "}
//                                 <span className="text-danger">*</span>
//                               </label>
//                               <input className="form-control" type="text" />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block">
//                               <label>
//                                 Date of birth{" "}
//                                 <span className="text-danger">*</span>
//                               </label>
//                               <input className="form-control" type="text" />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block">
//                               <label>
//                                 Phone <span className="text-danger">*</span>
//                               </label>
//                               <input className="form-control" type="text" />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="add-more">
//                           <Link to="#">
//                             <i className="fa fa-plus-circle" /> Add More
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="submit-section">
//                     <button className="btn btn-primary submit-btn">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Family Info Modal */}
//         {/* Emergency Contact Modal */}
//         <div
//           id="emergency_contact_modal"
//           className="modal custom-modal fade"
//           role="dialog"
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Personal Information</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="card">
//                     <div className="card-body">
//                       <h3 className="card-title">Primary Contact</h3>
//                       <div className="row">
//                         <div className="col-md-6">
//                           <div className="input-block">
//                             <label>
//                               Name <span className="text-danger">*</span>
//                             </label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="input-block">
//                             <label>
//                               Relationship{" "}
//                               <span className="text-danger">*</span>
//                             </label>
//                             <input className="form-control" type="text" />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="input-block">
//                             <label>
//                               Phone <span className="text-danger">*</span>
//                             </label>
//                             <input className="form-control" type="text" />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="input-block">
//                             <label>Phone 2</label>
//                             <input className="form-control" type="text" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card">
//                     <div className="card-body">
//                       <h3 className="card-title">Primary Contact</h3>
//                       <div className="row">
//                         <div className="col-md-6">
//                           <div className="input-block">
//                             <label>
//                               Name <span className="text-danger">*</span>
//                             </label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="input-block">
//                             <label>
//                               Relationship{" "}
//                               <span className="text-danger">*</span>
//                             </label>
//                             <input className="form-control" type="text" />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="input-block">
//                             <label>
//                               Phone <span className="text-danger">*</span>
//                             </label>
//                             <input className="form-control" type="text" />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="input-block">
//                             <label>Phone 2</label>
//                             <input className="form-control" type="text" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="submit-section">
//                     <button className="btn btn-primary submit-btn">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Emergency Contact Modal */}
//         {/* Education Modal */}
//         <div
//           id="education_info"
//           className="modal custom-modal fade"
//           role="dialog"
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title"> Education Informations</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="form-scroll">
//                     <div className="card">
//                       <div className="card-body">
//                         <h3 className="card-title">
//                           Education Informations{" "}
//                           <Link to="#" className="delete-icon">
//                             <i className="fa fa-trash" />
//                           </Link>
//                         </h3>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <input
//                                 type="text"
//                                 defaultValue="Oxford University"
//                                 className="form-control floating"
//                               />
//                               <label className="focus-label">Institution</label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <input
//                                 type="text"
//                                 defaultValue="Computer Science"
//                                 className="form-control floating"
//                               />
//                               <label className="focus-label">Subject</label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <div>
//                                 <input
//                                   type="date"
//                                   defaultValue="01/06/2002"
//                                   className="form-control floating datetimepicker"
//                                 />
//                               </div>
//                               <label className="focus-label">
//                                 Starting Date
//                               </label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <div>
//                                 <input
//                                   type="date"
//                                   defaultValue="31/05/2006"
//                                   className="form-control floating datetimepicker"
//                                 />
//                               </div>
//                               <label className="focus-label">
//                                 Complete Date
//                               </label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <input
//                                 type="text"
//                                 defaultValue="BE Computer Science"
//                                 className="form-control floating"
//                               />
//                               <label className="focus-label">Degree</label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <input
//                                 type="text"
//                                 defaultValue="Grade A"
//                                 className="form-control floating"
//                               />
//                               <label className="focus-label">Grade</label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card">
//                       <div className="card-body">
//                         <h3 className="card-title">
//                           Education Informations{" "}
//                           <Link to="#" className="delete-icon">
//                             <i className="fa fa-trash" />
//                           </Link>
//                         </h3>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <input
//                                 type="text"
//                                 defaultValue="Oxford University"
//                                 className="form-control floating"
//                               />
//                               <label className="focus-label">Institution</label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <input
//                                 type="text"
//                                 defaultValue="Computer Science"
//                                 className="form-control floating"
//                               />
//                               <label className="focus-label">Subject</label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <div>
//                                 <input
//                                   type="date"
//                                   defaultValue="01/06/2002"
//                                   className="form-control floating datetimepicker"
//                                 />
//                               </div>
//                               <label className="focus-label">
//                                 Starting Date
//                               </label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <div>
//                                 <input
//                                   type="date"
//                                   defaultValue="31/05/2006"
//                                   className="form-control floating datetimepicker"
//                                 />
//                               </div>
//                               <label className="focus-label">
//                                 Complete Date
//                               </label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <input
//                                 type="text"
//                                 defaultValue="BE Computer Science"
//                                 className="form-control floating"
//                               />
//                               <label className="focus-label">Degree</label>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus focused">
//                               <input
//                                 type="text"
//                                 defaultValue="Grade A"
//                                 className="form-control floating"
//                               />
//                               <label className="focus-label">Grade</label>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="add-more">
//                           <Link to="#">
//                             <i className="fa fa-plus-circle" /> Add More
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="submit-section">
//                     <button className="btn btn-primary submit-btn">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Education Modal */}
//         {/* Experience Modal */}
//         <div
//           id="experience_info"
//           className="modal custom-modal fade"
//           role="dialog"
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Experience Informations</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="form-scroll">
//                     <div className="card">
//                       <div className="card-body">
//                         <h3 className="card-title">
//                           Experience Informations{" "}
//                           <Link to="#" className="delete-icon">
//                             <i className="fa fa-trash" />
//                           </Link>
//                         </h3>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <input
//                                 type="text"
//                                 className="form-control floating"
//                                 placeholder="Company Name"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <input
//                                 type="text"
//                                 className="form-control floating"
//                                 placeholder="Location"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <input
//                                 type="text"
//                                 className="form-control floating"
//                                 placeholder=" Job Position"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <div>
//                                 <input
//                                   type="date"
//                                   className="form-control floating datetimepicker"
//                                   placeholder="Period From"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <div>
//                                 <input
//                                   type="date"
//                                   className="form-control floating datetimepicker"
//                                   placeholder="Period To"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card">
//                       <div className="card-body">
//                         <h3 className="card-title">
//                           Experience Informations{" "}
//                           <Link to="#" className="delete-icon">
//                             <i className="fa fa-trash" />
//                           </Link>
//                         </h3>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <input
//                                 type="text"
//                                 className="form-control floating"
//                                 placeholder=" Company Name"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <input
//                                 type="text"
//                                 className="form-control floating"
//                                 placeholder="Location"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <input
//                                 type="text"
//                                 className="form-control floating"
//                                 placeholder="Job Position"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <div>
//                                 <input
//                                   type="date"
//                                   className="form-control floating datetimepicker"
//                                   placeholder="Period From"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="input-block form-focus">
//                               <div>
//                                 <input
//                                   type="date"
//                                   className="form-control floating datetimepicker"
//                                   placeholder="Period To"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="add-more">
//                           <Link to="#">
//                             <i className="fa fa-plus-circle" /> Add More
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="submit-section">
//                     <button className="btn btn-primary submit-btn">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Experience Modal */}
//         {/* Add setting Modal */}
//         <div
//           id="add_emp_settings"
//           className="modal custom-modal fade"
//           role="dialog"
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add Setting</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleSubmit(handleFormSubmit)}>
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>
//                           Shift Start <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           className="form-control"
//                           type="time"
//                           {...register("shift_start", { required: true })}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>
//                           Shift End <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           className="form-control"
//                           type="time"
//                           {...register("shift_end", { required: true })}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>
//                           Blurred Screenshots{" "}
//                           <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           className="form-control"
//                           {...register("blurred_screenshots", {
//                             required: true,
//                           })}
//                         >
//                           <option value={true}>Yes</option>
//                           <option value={false}>No</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>
//                           Track According to Shift{" "}
//                           <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           className="form-control"
//                           {...register("track_according_to_shift", {
//                             required: true,
//                           })}
//                         >
//                           <option value={true}>Yes</option>
//                           <option value={false}>No</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>
//                           Productive Tab/URL{" "}
//                           <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           {...register("productive_tab", { required: true })}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>
//                           Non Productive Tab/URL{" "}
//                           <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           {...register("non_productive_tab", {
//                             required: true,
//                           })}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>
//                           Screenshot Interval{" "}
//                           <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           className="form-control"
//                           {...register("screenshot_interval", {
//                             required: true,
//                           })}
//                         >
//                           <option value="1m">Every 1 minute</option>
//                           <option value="5m">Every 5 minutes</option>
//                           <option value="10m">Every 10 minutes</option>
//                           <option value="15m">Every 15 minutes</option>
//                           <option value="30m">Every 30 minutes</option>
//                           <option value="1h">Every 1 hour</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>
//                           Allow Data Transfer(USB Drive){" "}
//                           <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           className="form-control"
//                           {...register("allow_data_transfer", {
//                             required: true,
//                           })}
//                         >
//                           <option value={true}>Yes</option>
//                           <option value={false}>No</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="submit-section">
//                     <button
//                       className="btn btn-primary submit-btn"
//                       type="submit"
//                       data-bs-dismiss="modal"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/*Edit Setting Modal */}
//         <div
//           id="edit_setting_modal"
//           className="modal custom-modal fade"
//           role="dialog"
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Edit Setting</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleUpdate(onUpdate)}>
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Shift Start</label>
//                         <input
//                           className="form-control"
//                           type="time"
//                           {...registerUpdate("shift_start", {})}
//                           defaultValue={
//                             selectedSetting ? selectedSetting.shift_start : ""
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Shift End</label>
//                         <input
//                           className="form-control"
//                           type="time"
//                           {...registerUpdate("shift_end", {})}
//                           defaultValue={
//                             selectedSetting ? selectedSetting.shift_end : ""
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Blurred Screenshots </label>
//                         <select
//                           className="form-control"
//                           {...registerUpdate("blurred_screenshots", {})}
//                           defaultValue={
//                             selectedSetting
//                               ? selectedSetting.blurred_screenshots
//                               : ""
//                           }
//                         >
//                           <option value={true}>Yes</option>
//                           <option value={false}>No</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label> </label>
//                         <select
//                           className="form-control"
//                           {...registerUpdate("track_according_to_shift", {})}
//                           defaultValue={
//                             selectedSetting
//                               ? selectedSetting.track_according_to_shift
//                               : ""
//                           }
//                         >
//                           <option value={true}>Yes</option>
//                           <option value={false}>No</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Productive Tab/URL </label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           {...registerUpdate("productive_tab", {})}
//                           defaultValue={
//                             selectedSetting
//                               ? selectedSetting.productive_tab
//                               : ""
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Non Productive Tab/URL </label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           {...registerUpdate("non_productive_tab", {})}
//                           defaultValue={
//                             selectedSetting
//                               ? selectedSetting.non_productive_tab
//                               : ""
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Screenshot Interval </label>
//                         <select
//                           className="form-control"
//                           {...registerUpdate("screenshot_interval", {})}
//                           defaultValue={
//                             selectedSetting
//                               ? selectedSetting.screenshot_interval
//                               : ""
//                           }
//                         >
//                           <option value="1m">Every 1 minute</option>
//                           <option value="5m">Every 5 minutes</option>
//                           <option value="10m">Every 10 minutes</option>
//                           <option value="15m">Every 15 minutes</option>
//                           <option value="30m">Every 30 minutes</option>
//                           <option value="1h">Every 1 hour</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>
//                           Allow Data Transfer(USB Drive){" "}
                         
//                         </label>
//                         <select
//                           className="form-control"
//                           {...registerUpdate("allow_data_transfer", {})}
//                           defaultValue={
//                             selectedSetting
//                               ? selectedSetting.allow_data_transfer
//                               : ""
//                           }
//                         >
//                           <option value={true}>Yes</option>
//                           <option value={false}>No</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="submit-section">
//                     <button
//                       className="btn btn-primary submit-btn"
//                       type="submit"
//                       data-bs-dismiss="modal"
//                     >
//                       Update
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Offcanvas />
//     </>
//   );
// };
// export default EmployeeProfile;
