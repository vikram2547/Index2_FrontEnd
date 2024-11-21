// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import { addRoles } from "../../../store/addroles";
// import { getRoles } from "../../../store/getroles";
// import { fetchPermissions } from "../../../store/fetchpermissions";
// import { updatePermissions } from "../../../store/updatepermissions";

// const RolesPermissions = () => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.login.token);
//   const roles = useSelector((state) => state.getroles.getroles);
//   const roleinfo = useSelector(
//     (state) => state.fetchpermissions.fetchpermissions
//   );
//   const [isEditable, setIsEditable] = useState(false);
//   const handleEnableUpdate = () => setIsEditable(true);
//   const handleDisableUpdate = () => setIsEditable(false);
//   const [selectedRoleId, setSelectedRoleId] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     can_view_role: false,
//     can_update_role: false,
//     can_create_role: false,
//     can_delete_role: false,
//     can_view_asset: false,
//     can_update_asset: false,
//     can_create_asset: false,
//     can_delete_asset: false,
//     can_create_user: false,
//     can_update_user: false,
//     can_delete_user: false,
//     can_view_user: false,
//     can_view_teams: false,
//     can_update_teams: false,
//     can_delete_teams: false,
//     can_create_teams: false,
//     manage_teams_settings: false,
//     manage_user_settings: false,
//     view_activities: false,
//     delete_activities: false,
//     download_activities: false,
//     view_realtime_status: false,
//     view_live_screen: false,
//   });
//   const [alert, setAlert] = useState({ message: "", type: "" });
//   const [alertTimeout, setAlertTimeout] = useState(null);

//   useEffect(() => {
//     dispatch(getRoles(token));
//   }, [dispatch, token]);

//   useEffect(() => {
//     if (selectedRoleId) {
//       dispatch(fetchPermissions(token, selectedRoleId));
//     }
//   }, [dispatch, token, selectedRoleId]);

//   useEffect(() => {
//     if (roleinfo) {
//       setFormData({
//         name: roleinfo.name || "",
//         description: roleinfo.description || "",
//         can_view_role: roleinfo.can_view_role || "",
//         can_update_role: roleinfo.can_update_role || "",
//         can_create_role: roleinfo.can_create_role || "",
//         can_delete_role: roleinfo.can_delete_role || "",
//         can_view_asset: roleinfo.can_view_asset || "",
//         can_update_asset: roleinfo.can_update_asset || "",
//         can_create_asset: roleinfo.can_create_asset || "",
//         can_delete_asset: roleinfo.can_delete_asset || "",
//         can_create_user: roleinfo.can_create_user || "",
//         can_update_user: roleinfo.can_update_user || "",
//         can_delete_user: roleinfo.can_delete_user || "",
//         can_view_user: roleinfo.can_view_user || "",
//         can_view_teams: roleinfo.can_view_teams || "",
//         can_update_teams: roleinfo.can_update_teams || "",
//         can_delete_teams: roleinfo.can_delete_teams || "",
//         can_create_teams: roleinfo.can_create_teams || "",
//         manage_teams_settings: roleinfo.manage_teams_settings || "",
//         manage_user_settings: roleinfo.manage_user_settings || "",
//         view_activities: roleinfo.view_activities || "",
//         delete_activities: roleinfo.delete_activities || "",
//         download_activities: roleinfo.download_activities || "",
//         view_realtime_status: roleinfo.view_realtime_status || "",
//         view_live_screen: roleinfo.view_live_screen || "",
//       });
//     }
//   }, [roleinfo]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleRoleClick = (roleId) => {
//     setSelectedRoleId(roleId);
//     setShowAddForm(false);
//   };

//   const handleCreateRole = () => {
//     setSelectedRoleId(null);
//     setShowAddForm(true);
//     setFormData({
//       name: "",
//       description: "",
//       can_view_role: false,
//       can_update_role: false,
//       can_create_role: false,
//       can_delete_role: false,
//       can_view_asset: false,
//       can_update_asset: false,
//       can_create_asset: false,
//       can_delete_asset: false,
//       can_create_user: false,
//       can_update_user: false,
//       can_delete_user: false,
//       can_view_user: false,
//       can_view_teams: false,
//       can_update_teams: false,
//       can_delete_teams: false,
//       can_create_teams: false,
//       manage_teams_settings: false,
//       manage_user_settings: false,
//       view_activities: false,
//       delete_activities: false,
//       download_activities: false,
//       view_realtime_status: false,
//       view_live_screen: false,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(addRoles(token, formData));
//       setAlert({ message: "Role added successfully!", type: "success" });
//       dispatch(getRoles(token));
//       setShowAddForm(false);
//       clearAlertAfterTimeout();
//     } catch (error) {
//       setAlert({ message: "An unexpected error occurred.", type: "error" });
//       clearAlertAfterTimeout();
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(
//         updatePermissions({ token, selectedRoleId, updateData: formData })
//       );
//       setAlert({ message: "Role updated successfully!", type: "success" });
//       dispatch(getRoles(token));
//       setSelectedRoleId(null);
//       clearAlertAfterTimeout();
//     } catch (error) {
//       setAlert({ message: "An unexpected error occurred.", type: "error" });
//       clearAlertAfterTimeout();
//     }
//   };

//   const clearAlertAfterTimeout = () => {
//     if (alertTimeout) {
//       clearTimeout(alertTimeout);
//     }
//     setAlertTimeout(
//       setTimeout(() => {
//         setAlert({ message: "", type: "" });
//       }, 3000)
//     );
//   };

//   const handleCancel = () => {
//     setShowAddForm(false);
//     setSelectedRoleId(null);
//     setFormData({
//       name: "",
//       description: "",
//       can_view_role: false,
//       can_update_role: false,
//       can_create_role: false,
//       can_delete_role: false,
//       can_view_asset: false,
//       can_update_asset: false,
//       can_create_asset: false,
//       can_delete_asset: false,
//       can_create_user: false,
//       can_update_user: false,
//       can_delete_user: false,
//       can_view_user: false,
//       can_view_teams: false,
//       can_update_teams: false,
//       can_delete_teams: false,
//       can_create_teams: false,
//       manage_teams_settings: false,
//       manage_user_settings: false,
//       view_activities: false,
//       delete_activities: false,
//       download_activities: false,
//       view_realtime_status: false,
//       view_live_screen: false,
//     });
//     setIsEditable(false);
//   };

//   useEffect(() => {
//     // Reset to read-only mode when a new role is selected or when showAddForm is toggled
//     setIsEditable(false);
//   }, [selectedRoleId, showAddForm]);

//   return (
//     <div className="page-wrapper">
//       <Helmet>
//         <title>Roles and Permissions - HRMS Admin Template</title>
//         <meta name="description" content="Manage roles and permissions" />
//       </Helmet>
//       <div className="content container-fluid">
//         <div className="page-header">
//           <div className="row">
//             <div className="col-sm-12">
//               <h3 className="page-title">Roles and Permissions</h3>
//               <ul className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <Link to="/app/main/dashboard">Dashboard</Link>
//                 </li>
//                 <li className="breadcrumb-item active">
//                   Roles and Permissions
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-xl-3">
//             <div className="list-group">
//               <button
//                 className="btn btn-primary mb-3"
//                 onClick={handleCreateRole}
//               >
//                 Create New Role
//               </button>
//               {roles?.map((role) => (
//                 <button
//                   key={role.id}
//                   className={`list-group-item list-group-item-action ${
//                     role.id === selectedRoleId ? "active" : ""
//                   }`}
//                   onClick={() => handleRoleClick(role.id)}
//                 >
//                   {role.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="col-xl-9">
//             {(showAddForm || selectedRoleId) && (
//               <div className="card mb-4" style={{ backgroundColor: "#f8f9fa" }}>
//                 <div className="card-header d-flex justify-content-between align-items-center">
//                   <h4 className="card-title mb-0">
//                     {showAddForm ? "Create Role" : "Update Role"}
//                   </h4>
//                   {!showAddForm && (
//                     <button
//                       className="btn btn-primary"
//                       onClick={
//                         isEditable ? handleDisableUpdate : handleEnableUpdate
//                       }
//                     >
//                       {isEditable ? "Disable" : "Enable Update"}
//                     </button>
//                   )}
//                 </div>
//                 <div className="card-body">
//                   {alert.message && (
//                     <div
//                       className={`alert ${
//                         alert.type === "error"
//                           ? "alert-danger"
//                           : "alert-success"
//                       }`}
//                     >
//                       {alert.message}
//                     </div>
//                   )}
//                   <form onSubmit={showAddForm ? handleSubmit : handleUpdate}>
//                     <div className="row">
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <label>Role</label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             disabled={showAddForm ? false : !isEditable}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <label>Description</label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             required
//                             disabled={showAddForm ? false : !isEditable}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <div className="table-responsive">
//                         <table className="table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>Management</th>
//                               <th>View</th>
//                               <th>Add</th>
//                               <th>Update</th>
//                               <th>Delete</th>
//                               <th className="narrow-column">
//                                 Manage User Settings
//                               </th>
//                               <th className="narrow-column">
//                                 Manage Teams Settings
//                               </th>
//                               <th className="narrow-column">View Activities</th>
//                               <th className="narrow-column">
//                                 Delete Activities
//                               </th>
//                               <th className="narrow-column">
//                                 Download Activities
//                               </th>
//                               <th className="narrow-column">
//                                 View Real-time Status
//                               </th>
//                               <th className="narrow-column">
//                                 View Live Screen
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td>Role Management</td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_view_role"
//                                   checked={formData.can_view_role}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_create_role"
//                                   checked={formData.can_create_role}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_update_role"
//                                   checked={formData.can_update_role}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_delete_role"
//                                   checked={formData.can_delete_role}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                             </tr>
//                             <tr>
//                               <td>Asset Management</td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_view_asset"
//                                   checked={formData.can_view_asset}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_create_asset"
//                                   checked={formData.can_create_asset}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_update_asset"
//                                   checked={formData.can_update_asset}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_delete_asset"
//                                   checked={formData.can_delete_asset}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                             </tr>
//                             <tr>
//                               <td>User Management</td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_view_user"
//                                   checked={formData.can_view_user}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_create_user"
//                                   checked={formData.can_create_user}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_update_user"
//                                   checked={formData.can_update_user}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_delete_user"
//                                   checked={formData.can_delete_user}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="manage_user_settings"
//                                   checked={formData.manage_user_settings}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                             </tr>
//                             <tr>
//                               <td>Team Management</td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_view_teams"
//                                   checked={formData.can_view_teams}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_create_teams"
//                                   checked={formData.can_create_teams}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_update_teams"
//                                   checked={formData.can_update_teams}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="can_delete_teams"
//                                   checked={formData.can_delete_teams}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td></td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="manage_teams_settings"
//                                   checked={formData.manage_teams_settings}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                             </tr>
//                             <tr>
//                               <td>Activity Management</td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td></td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="view_activities"
//                                   checked={formData.view_activities}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="delete_activities"
//                                   checked={formData.delete_activities}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="download_activities"
//                                   checked={formData.download_activities}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="view_realtime_status"
//                                   checked={formData.view_realtime_status}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   name="view_live_screen"
//                                   checked={formData.view_live_screen}
//                                   onChange={handleChange}
//                                   disabled={showAddForm ? false : !isEditable}
//                                 />
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <button
//                         className="btn btn-primary"
//                         type="submit"
//                         disabled={showAddForm ? false : !isEditable}
//                         style={{ marginRight: "15px" }}
//                       >
//                         {showAddForm ? "Create" : "Update"}
//                       </button>
//                       {!showAddForm && (
//                         <button
//                           className="btn btn-secondary ml-2"
//                           type="button"
//                           onClick={handleCancel}
//                         >
//                           Cancel
//                         </button>
//                       )}
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RolesPermissions;
