// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import Offcanvas from "../../../Entryfile/offcanvance";
// import { getGroupProfileData } from "../../../store/getgroupsprofileinfo";
// import { addGroupSettings } from "../../../store/addgroupsetting";
// import { useForm } from "react-hook-form";
// import { updateSetting } from "../../../store/updategroupsetting";
// import "bootstrap/dist/css/bootstrap.min.css";

// const GroupsProfile = () => {
//   const params = useParams();
//   const { id } = params;
//   const dispatch = useDispatch();
//   const info = useSelector((state) => state.getgroupsprofileinfo.profileData);
//   console.log(info,"info");
  
//   const add = useSelector((state) => state.addgroupsetting.addsettings);
//   const update = useSelector((state) => state.updategroupsetting.updatesetting);
//   const token = useSelector((state) => state.login.token);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [isEditFormVisible, setIsEditFormVisible] = useState(false);
//   const [selectedSetting, setSelectedSetting] = useState(null);
//   const [activeTab, setActiveTab] = useState("members");
//   const [selectedMember, setSelectedMember] = useState(null);

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

//   const handleFormSubmit = async (data) => {
//     setShowForm(false);
//     const formData = {
//       ...data,
//       team: id,
//       screenshot_interval: convertIntervalToDjangoFormat(
//         data.screenshot_interval
//       ),
//     };
//     dispatch(addGroupSettings(token, formData));
//     reset();
//   };

//   const onEdit = (settings) => {
//     setSelectedSetting(settings);
//     setIsEditFormVisible(true);
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
//       team: id,
//       screenshot_interval: convertIntervalToDjangoFormat(
//         data.screenshot_interval
//       ),
//     };
//     dispatch(updateSetting({ token, id: selectedSetting.id, updateData }));

//     setIsEditFormVisible(false);
//     reset();
//   };

//   useEffect(() => {
//     if (token && id) {
//       console.log(`Fetching profile data for id: ${id} with token: ${token}`);
//       dispatch(getGroupProfileData(token, id)).finally(() => {
//         setLoading(false);
//       });
//     } else {
//       console.log(`Missing token or id. Token: ${token}, ID: ${id}`);
//       setLoading(false);
//     }
//   }, [dispatch, token, id]);

//   useEffect(() => {
//     if (add || update) {
//       dispatch(getGroupProfileData(token, id));
//     }
//   }, [add, update, dispatch, token, id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!info || !info.team) {
//     console.error("Groups data not available or is null:", info);
//     return <div>Groups data not available</div>;
//   }

//   const { department_name, group_head, members } = info.team || {};
//   const settings = info.settings || null;

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
//                     <div className="profile-basic">
//                       <div className="row">
//                         <div className="col-md-5">
//                           <div className="profile-info-left">
//                             <h3 className="user-name m-t-0 mb-0">
//                               {department_name && (
//                                 <span>Department Name: {department_name}</span>
//                               )}
//                             </h3>

//                             <div className="staff-id">
//                               {group_head && (
//                                 <span>Team Head: {team_head}</span>
//                               )}
//                             </div>
//                             <div className="staff-msg"></div>
//                           </div>
//                         </div>

//                         <div className="col-md-7">
//                           <div className="col-md-7">
//                             <ul className="personal-info">
//                               <li>
//                                 <div className="title">Members:</div>
//                                 <div className="text">
//                                   {members &&
//                                     members.map((member) => (
//                                       <div key={member.id}>
//                                         {member.first_name} {member.last_name}
//                                       </div>
//                                     ))}
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
//                   <li className="nav-item">
//                     <Link
//                       to="#"
//                       onClick={() => setActiveTab("members")}
//                       className={`nav-link ${
//                         activeTab === "members" ? "active" : ""
//                       }`}
//                     >
//                       Members
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       to="#"
//                       onClick={() => setActiveTab("settings")}
//                       className={`nav-link ${
//                         activeTab === "settings" ? "active" : ""
//                       }`}
//                     >
//                       Settings
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           {activeTab === "settings" && (
//             <div className="profile-page">
//               <div>
//                 <div className="table-responsive table-newdatatable">
//                   <div className="d-flex justify-content-end align-items-center">
//                     {!settings && (
//                       <button
//                         className="btn btn-primary"
//                         data-bs-toggle="modal"
//                         data-bs-target="#add_group_setting"
//                         style={{ float: "right" }}
//                       >
//                         Add Team Settings
//                       </button>
//                     )}
//                   </div>
//                   <br></br>
//                   <table className="table table-new custom-table mb-0 datatable">
//                     <thead>
//                       <tr>
//                         <th>Sr.No</th>
//                         <th>Shift Start</th>
//                         <th>Shift End</th>
//                         <th>Blurred Screenshot</th>
//                         <th>Screenshot Interval</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {settings ? (
//                         <tr key={settings.id}>
//                           <td>1</td>
//                           <td>{settings.shift_start || "N/A"}</td>
//                           <td>{settings.shift_end || "N/A"}</td>
//                           <td>{settings.blurred_screenshots ? "Yes" : "No"}</td>
//                           <td>{settings.screenshot_interval || "N/A"}</td>
//                           <td>
//                             <div className="table-actions d-flex">
//                               <button
//                                 to="#"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#edit_setting_modal"
//                                 onClick={() => onEdit(settings)}
//                                 className="btn btn-sm btn-primary"
//                               >
//                                 Edit
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ) : (
//                         <tr>
//                           <td colSpan="6">No setting assigned</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "members" && (
//             <div className="profile-page" id="group_members">
//               <div>
//                 <div className="table-responsive table-newdatatable">
//                   <table className="table table-new custom-table mb-0 datatable">
//                     <thead>
//                       <tr>
//                         <th>Sr.No</th>
//                         <th>Name</th>
//                         <th>Employee Id</th>
//                         <th>Phone</th>
//                         <th>Address</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {members.length > 0 ? (
//                         members.map((member, index) => (
//                           <tr key={member.id}>
//                             <td>{index + 1}</td>
//                             <td>
//                               {` ${member.first_name} ${member.last_name}`}
//                             </td>

//                             <td>{member.employee_id}</td>
//                             <td>{member.phone}</td>

//                             <td>{member.address}</td>
//                             <td>
//                               <div className="table-actions d-flex">
//                                 <Link
//                                   to={`/app/profile/employee-profile/${member?.id}`}
//                                   className="btn btn-sm btn-primary"
//                                 >
//                                   View
//                                 </Link>
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="6">No members available</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add setting Modal */}
//       <div
//         id="add_group_setting"
//         className="modal custom-modal fade"
//         role="dialog"
//       >
//         <div
//           className="modal-dialog modal-dialog-centered modal-lg"
//           role="document"
//         >
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Add Setting</h5>
//               <button
//                 type="button"
//                 className="close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <span aria-hidden="true">×</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleSubmit(handleFormSubmit)}>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>
//                         Shift Start <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         className="form-control"
//                         type="time"
//                         {...register("shift_start", { required: true })}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>
//                         Shift End <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         className="form-control"
//                         type="time"
//                         {...register("shift_end", { required: true })}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>
//                         Blurred Screenshots{" "}
//                         <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         className="form-control"
//                         {...register("blurred_screenshots", { required: true })}
//                       >
//                         <option value={true}>Yes</option>
//                         <option value={false}>No</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>
//                         Track According to Shift{" "}
//                         <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         className="form-control"
//                         {...register("track_according_to_shift", {
//                           required: true,
//                         })}
//                       >
//                         <option value={true}>Yes</option>
//                         <option value={false}>No</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>
//                         Productive Tab/URL{" "}
//                         <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         className="form-control"
//                         type="text"
//                         {...register("productive_tab", { required: true })}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>
//                         Non Productive Tab/URL
//                         <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         className="form-control"
//                         type="text"
//                         {...register("non_productive_tab", { required: true })}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>
//                         Screenshot Interval{" "}
//                         <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         className="form-control"
//                         {...register("screenshot_interval", { required: true })}
//                       >
//                         <option value="1m">Every 1 minute</option>
//                         <option value="5m">Every 5 minutes</option>
//                         <option value="10m">Every 10 minutes</option>
//                         <option value="15m">Every 15 minutes</option>
//                         <option value="30m">Every 30 minutes</option>
//                         <option value="1h">Every 1 hour</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>
//                       Allow Data Transfer(USB Drive){" "}
//                         <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         className="form-control"
//                         {...register("allow_data_transfer", {
//                           required: true,
//                         })}
//                       >
//                         <option value={true}>Yes</option>
//                         <option value={false}>No</option>
//                       </select>
//                     </div>
//                   </div>
                  
//                 </div>
//                 <div className="submit-section">
//                   <button
//                     className="btn btn-primary submit-btn"
//                     type="submit"
//                     data-bs-dismiss="modal"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/*Edit Setting Modal */}
//       <div
//         id="edit_setting_modal"
//         className="modal custom-modal fade"
//         role="dialog"
//       >
//         <div
//           className="modal-dialog modal-dialog-centered modal-lg"
//           role="document"
//         >
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Edit Setting</h5>
//               <button
//                 type="button"
//                 className="close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <span aria-hidden="true">×</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleUpdate(onUpdate)}>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>Shift Start</label>
//                       <input
//                         className="form-control"
//                         type="time"
//                         {...registerUpdate("shift_start", {})}
//                         defaultValue={
//                           selectedSetting ? selectedSetting.shift_start : ""
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>Shift End</label>
//                       <input
//                         className="form-control"
//                         type="time"
//                         {...registerUpdate("shift_end", {})}
//                         defaultValue={
//                           selectedSetting ? selectedSetting.shift_end : ""
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>Blurred Screenshots </label>
//                       <select
//                         className="form-control"
//                         {...registerUpdate("blurred_screenshots", {})}
//                         defaultValue={
//                           selectedSetting
//                             ? selectedSetting.blurred_screenshots
//                             : ""
//                         }
//                       >
//                         <option value={true}>Yes</option>
//                         <option value={false}>No</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>Track According to Shift </label>
//                       <select
//                         className="form-control"
//                         {...registerUpdate("track_according_to_shift", {})}
//                         defaultValue={
//                           selectedSetting
//                             ? selectedSetting.track_according_to_shift
//                             : ""
//                         }
//                       >
//                         <option value={true}>Yes</option>
//                         <option value={false}>No</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>Productive Tab/URL </label>
//                       <input
//                         className="form-control"
//                         type="text"
//                         {...registerUpdate("productive_tab", {})}
//                         defaultValue={
//                           selectedSetting ? selectedSetting.productive_tab : ""
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>Non Productive Tab/URL</label>
//                       <input
//                         className="form-control"
//                         type="text"
//                         {...registerUpdate("non_productive_tab", {})}
//                         defaultValue={
//                           selectedSetting
//                             ? selectedSetting.non_productive_tab
//                             : ""
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group">
//                       <label>Screenshot Interval </label>
//                       <select
//                         className="form-control"
//                         {...registerUpdate("screenshot_interval", {})}
//                         defaultValue={
//                           selectedSetting
//                             ? selectedSetting.screenshot_interval
//                             : ""
//                         }
//                       >
//                         <option value="1m">Every 1 minute</option>
//                         <option value="5m">Every 5 minutes</option>
//                         <option value="10m">Every 10 minutes</option>
//                         <option value="15m">Every 15 minutes</option>
//                         <option value="30m">Every 30 minutes</option>
//                         <option value="1h">Every 1 hour</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
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
//                 </div>
//                 <div className="submit-section">
//                   <button
//                     className="btn btn-primary submit-btn"
//                     type="submit"
//                     data-bs-dismiss="modal"
//                   >
//                     Update
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Offcanvas />
//     </>
//   );
// };

// export default GroupsProfile;
