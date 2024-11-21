// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getallgroupData } from "../../../store/allgroup";
// import { getallemployeeData } from "../../../store/allemployee";
// import { getManagers } from "../../../store/allmanagers";
// import Select from "react-select";
// import Header from "../../../initialpage/Sidebar/header";
// import Sidebar from "../../../initialpage/Sidebar/sidebar";
// import { updateGroup } from "../../../store/updategroup";
// import { addGroup } from "../../../store/addgroup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { addGroupSchema, editGroupSchema } from "./schemas";
// import "./allgroups.css";
// import { getEmployees } from "../../../store/getemployee";

// const AllGroups = () => {
//   const dispatch = useDispatch();
//   const [isEditFormVisible, setIsEditFormVisible] = useState(false);
//   const [isAddFormVisible, setIsAddFormVisible] = useState(false);
//   const [editGroupData, setEditGroupData] = useState(null);
//   const [menu, setMenu] = useState(false);
//   const [groupHead, setGroupHead] = useState(null);
//   const [members, setMembers] = useState([]);

//   const token = useSelector((state) => state.login.token);
//   const groupdata = useSelector((state) => state.allgroup.groupData);
//   const employeeList = useSelector(
//     (state) => state.getemployee.getemployeelist
//   );
//   const managers = useSelector((state) => state.allmanagers.managers);
//   const addgroup = useSelector((state) => state.addgroup.addgroups);
//   const addGroupError = useSelector((state) => state.addgroup.error);
//   const updategroup = useSelector((state) => state.updategroup.updategroups);
//   const updateGroupError = useSelector((state) => state.updategroup.error);

//   const {
//     register: registerAdd,
//     handleSubmit: handleSubmitAdd,
//     setValue: setValueAdd,
//     reset: resetAdd,
//     formState: { errors: errorsAdd },
//   } = useForm({
//     resolver: yupResolver(addGroupSchema),
//   });

//   const {
//     register: registerEdit,
//     handleSubmit: handleSubmitEdit,
//     setValue: setValueEdit,
//     reset: resetEdit,
//     formState: { errors: errorsEdit },
//   } = useForm({
//     resolver: yupResolver(editGroupSchema),
//   });

//   const handleGroupHeadChange = (selectedOption) => {
//     setGroupHead(selectedOption);
//     setValueAdd("team_head", selectedOption ? selectedOption.value : null);
//   };

//   const handleMembersChange = (selectedOptions) => {
//     setMembers(selectedOptions);
//     setValueAdd(
//       "members",
//       selectedOptions ? selectedOptions.map((option) => option.value) : []
//     );
//   };

//   const handleEditGroupHeadChange = (selectedOption) => {
//     setGroupHead(selectedOption);
//     setValueEdit("team_head", selectedOption ? selectedOption.value : "");
//   };

//   const handleEditMembersChange = (selectedOptions) => {
//     setMembers(selectedOptions);
//     setValueEdit(
//       "members",
//       selectedOptions ? selectedOptions.map((option) => option.value) : []
//     );
//   };

//   const onEdit = (team) => {
//     setIsEditFormVisible(true);
//     setEditGroupData(team);

//     setValueEdit("department_name", team.department_name);

//     const selectedGroupHead = managerOptions.find(
//       (option) => option.label === team.team_head
//     );

//     setGroupHead(selectedGroupHead || null);
//     setValueEdit(
//       "team_head",
//       selectedGroupHead ? selectedGroupHead.value : null
//     );

//     const selectedMembers = team.members
//       ? team.members.map((member) =>
//           employeeOptions.find((option) => option.value === member.id)
//         )
//       : [];
//     setMembers(selectedMembers);
//     setValueEdit(
//       "members",
//       team.members ? team.members.map((member) => member.id) : []
//     );
//   };

//   const onUpdate = (data) => {
//     if (token && editGroupData) {
//       dispatch(updateGroup({ token, id: editGroupData.id, values: data }));
//     }
//     setIsEditFormVisible(false);
//     resetEdit();
//     setGroupHead(null);
//     setMembers([]);
//   };

//   useEffect(() => {
//     if (updategroup) {
//       alert("Team updated successfully");
//       setIsEditFormVisible(false);
//       resetEdit();
//       setGroupHead(null);
//       setMembers([]);
//     } else if (updateGroupError) {
//       const errorMessage = updateGroupError.error.replace(/[\[\]']+/g, "");
//       alert(`Error: ${errorMessage}`);
//     }
//   }, [updategroup, updateGroupError]);

//   const handleFormSubmit = async (data) => {
//     dispatch(addGroup(token, data));
//     setIsAddFormVisible(false);
//     resetAdd();
//     setGroupHead(null);
//     setMembers([]);
//   };

//   useEffect(() => {
//     if (addgroup) {
//       alert("Team created successfully");
//       setIsAddFormVisible(false);
//       resetAdd();
//       setGroupHead(null);
//       setMembers([]);
//     } else if (addGroupError) {
//       const errorMessage = addGroupError.error.replace(/[\[\]']+/g, "");
//       alert(`Error: ${errorMessage}`);
//     }
//   }, [addgroup, addGroupError]);

//   useEffect(() => {
//     if (token) {
//       dispatch(getallgroupData(token));
//       dispatch(getallemployeeData(token));
//       dispatch(getEmployees(token));
//       dispatch(getManagers(token));
//     }
//   }, [dispatch, token]);

//   useEffect(() => {
//     if (isAddFormVisible) {
//       resetAdd();
//       setGroupHead(null);
//       setMembers([]);
//     } else if (isEditFormVisible) {
//       resetEdit();
//     }
//   }, [isAddFormVisible]);

//   useEffect(() => {
//     if (addgroup || updategroup) {
//       dispatch(getallgroupData(token));
//       resetAdd();
//       resetEdit();
//       setGroupHead(null);
//       setMembers([]);
//     }
//   }, [dispatch, addgroup, updategroup, token]);

//   const employeeOptions = employeeList?.map((member) => ({
//     value: member.id,
//     label: `${member.first_name} ${member.last_name}`,
//   }));

//   const managerOptions = managers?.map((manager) => ({
//     value: manager.id,
//     label: `${manager.first_name} ${manager.last_name}`,
//   }));

//   return (
//     <>
//       <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
//         <Header onMenuClick={() => setMenu(!menu)} />
//         <Sidebar />
//         <div className="page-wrapper">
//           <Helmet>
//             <title>Monitor - Activity Tracker</title>
//             <meta name="description" content="Login page" />
//           </Helmet>
//           <div className="content container-fluid">
//             <div className="page-header">
//               <div className="row align-items-center">
//                 <div className="col">
//                   <h3 className="page-title">Activity Tracker</h3>
//                   <ul className="breadcrumb">
//                     <li className="breadcrumb-item">
//                       <Link to="/app/main/dashboard">Dashboard</Link>
//                     </li>
//                     <li className="breadcrumb-item active">Activity Tracker</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="card">
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col">
//                     <h5 className="page-title">All Teams</h5>
//                   </div>
//                   <div className="col">
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => setIsAddFormVisible(true)}
//                       style={{ float: "right" }}
//                     >
//                       Add Team
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row staff-grid-row">
//               {groupdata?.map((team, index) => (
//                 <div
//                   key={index}
//                   className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
//                 >
//                   <div className="profile-widget">
//                     <div className="profile">
//                       <Link
//                         to={`/app/groupprofile/groups-profile/${team?.id}`}
//                       ></Link>
//                     </div>
//                     <h4 className="">
//                       <Link to={`/app/groupprofile/groups-profile/${team?.id}`}>
//                         Team Head - {team?.team_head}
//                       </Link>
//                     </h4>
//                     <div className="small text-muted">
//                       <p>Members - {team?.members_count}</p>
//                     </div>

//                     <div className="dropdown profile-action">
//                       <Link
//                         to="#"
//                         className="action-icon dropdown-toggle"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         <i className="material-icons">more_vert</i>
//                       </Link>
//                       <div className="dropdown-menu dropdown-menu-right">
//                         <Link
//                           className="dropdown-item"
//                           to="#"
//                           onClick={() => onEdit(team)}
//                         >
//                           <i className="fa fa-pencil m-r-5" /> Edit
//                         </Link>
//                       </div>
//                     </div>
//                     <h4 className="user-name m-t-10 mb-0 text-ellipsis">
//                       <Link to={`/app/groupprofile/groups-profile/${team?.id}`}>
//                         {team?.department_name}
//                       </Link>
//                     </h4>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Add Group Modal */}
//           <div
//             id="add_grouop_modal"
//             className={`modal custom-modal fade ${
//               isAddFormVisible ? "show" : ""
//             }`}
//             role="dialog"
//             style={{
//               display: isAddFormVisible ? "block" : "none",
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//             }}
//           >
//             <div className="modal-dialog modal-dialog-centered" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Add Team</h5>
//                   <button
//                     type="button"
//                     className="close"
//                     aria-label="Close"
//                     onClick={() => setIsAddFormVisible(false)}
//                   >
//                     <span aria-hidden="true">&times;</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleSubmitAdd(handleFormSubmit)}>
//                   <div className="row">
//                   <div className="col-sm-12">
//                     <div className="input-block">
//                       <label>Department Name</label>
//                       <input
//                         type="text"
//                         className={`form-control ${
//                           errorsAdd.department_name ? "is-invalid" : ""
//                         }`}
//                         {...registerAdd("department_name")}
//                       />
//                       <div className="invalid-feedback">
//                         {errorsAdd.department_name?.message}
//                       </div>
//                     </div>
//                     </div>
//                     <div className="col-sm-12">
//                     <div className="input-block">
//                       <label>Team Head</label>
//                       <Select
//                         options={managerOptions}
//                         value={groupHead}
//                         onChange={handleGroupHeadChange}
//                         isClearable
//                         className={`${errorsAdd.team_head ? "is-invalid" : ""}`}
//                       />
//                       <div className="invalid-feedback">
//                         {errorsAdd.team_head?.message}
//                       </div>
//                     </div>
//                     <div className="input-block">
//                       <label>Members</label>
//                       <Select
//                         options={employeeOptions}
//                         value={members}
//                         onChange={handleMembersChange}
//                         isMulti
//                         className={`${errorsAdd.members ? "is-invalid" : ""}`}
//                       />
//                       <div className="invalid-feedback">
//                         {errorsAdd.members?.message}
//                       </div>
//                     </div>
//                     </div>
//                     <div className="submit-section">
//                       <button className="btn btn-primary" type="submit">
//                         Submit
//                       </button>
//                     </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Edit Group Modal */}
//           <div
//             id="edit_group_modal"
//             className={`modal custom-modal fade ${
//               isEditFormVisible ? "show" : ""
//             }`}
//             role="dialog"
//             style={{
//               display: isEditFormVisible ? "block" : "none",
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//             }}
//           >
//             <div className="modal-dialog modal-dialog-centered" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Edit Team</h5>
//                   <button
//                     type="button"
//                     className="close"
//                     aria-label="Close"
//                     onClick={() => setIsEditFormVisible(false)}
//                   >
//                     <span aria-hidden="true">&times;</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleSubmitEdit(onUpdate)}>
//                   <div className="row">
//                   <div className="col-sm-12">
//                   <div className="input-block">
//                       <label>Department Name</label>
//                       <input
//                         type="text"
//                         className={`form-control ${
//                           errorsEdit.department_name ? "is-invalid" : ""
//                         }`}
//                         {...registerEdit("department_name")}
//                       />
//                       <div className="invalid-feedback">
//                         {errorsEdit.department_name?.message}
//                       </div>
//                     </div>
//                     </div>
//                     <div className="col-sm-12">
//                     <div className="input-block">
//                       <label>Team Head</label>
//                       <Select
//                         options={managerOptions}
//                         value={groupHead}
//                         onChange={handleEditGroupHeadChange}
//                         isClearable
//                         className={`${
//                           errorsEdit.team_head ? "is-invalid" : ""
//                         }`}
//                       />
//                       <div className="invalid-feedback">
//                         {errorsEdit.team_head?.message}
//                       </div>
//                     </div>
//                     <div className="input-block">
//                       <label>Members</label>
//                       <Select
//                         options={employeeOptions}
//                         value={members}
//                         onChange={handleEditMembersChange}
//                         isMulti
//                         className={`${errorsEdit.members ? "is-invalid" : ""}`}
//                       />
//                       <div className="invalid-feedback">
//                         {errorsEdit.members?.message}
//                       </div>
//                     </div>
//                     </div>
//                     <div className="submit-section">
//                       <button className="btn btn-primary" type="submit">
//                         Update
//                       </button>
//                     </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllGroups;



// // import React, { useEffect, useState } from "react";
// // import { Helmet } from "react-helmet";
// // import { Link } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getallgroupData } from "../../../store/allgroup";
// // import { getallemployeeData } from "../../../store/allemployee";
// // import { getManagers } from "../../../store/allmanagers";
// // import Select from "react-select";
// // import Header from "../../../initialpage/Sidebar/header";
// // import Sidebar from "../../../initialpage/Sidebar/sidebar";
// // import { updateGroup } from "../../../store/updategroup";
// // import { addGroup } from "../../../store/addgroup";
// // import { useForm } from "react-hook-form";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import { addGroupSchema, editGroupSchema } from "./schemas";
// // import "./allgroups.css";
// // import { getEmployees } from "../../../store/getemployee";

// // const AllGroups = () => {
// //   const dispatch = useDispatch();
// //   const [isEditFormVisible, setIsEditFormVisible] = useState(false);
// //   const [isAddFormVisible, setIsAddFormVisible] = useState(false);
// //   const [editGroupData, setEditGroupData] = useState(null);
// //   const [menu, setMenu] = useState(false);
// //   const [groupHead, setGroupHead] = useState(null);
// //   const [members, setMembers] = useState([]);

// //   const token = useSelector((state) => state.login.token);
// //   const groupdata = useSelector((state) => state.allgroup.groupData);
// //   const employeeList = useSelector(
// //     (state) => state.getemployee.getemployeelist
// //   );
// //   const managers = useSelector((state) => state.allmanagers.managers);
// //   const addgroup = useSelector((state) => state.addgroup.addgroups);
// //   const addGroupError = useSelector((state) => state.addgroup.error);
// //   const updategroup = useSelector((state) => state.updategroup.updategroups);
// //   const updateGroupError = useSelector((state) => state.updategroup.error);

// //   const {
// //     register: registerAdd,
// //     handleSubmit: handleSubmitAdd,
// //     setValue: setValueAdd,
// //     reset: resetAdd,
// //     formState: { errors: errorsAdd },
// //   } = useForm({
// //     resolver: yupResolver(addGroupSchema),
// //   });

// //   const {
// //     register: registerEdit,
// //     handleSubmit: handleSubmitEdit,
// //     setValue: setValueEdit,
// //     reset: resetEdit,
// //     trigger,
// //     formState: { errors: errorsEdit },
// //   } = useForm({
// //     resolver: yupResolver(editGroupSchema),
// //   });

// //   const handleGroupHeadChange = (selectedOption) => {
// //     setGroupHead(selectedOption);
// //     setValueAdd("team_head", selectedOption ? selectedOption.value : null);
// //   };

// //   const handleMembersChange = (selectedOptions) => {
// //     setMembers(selectedOptions);
// //     setValueAdd(
// //       "members",
// //       selectedOptions ? selectedOptions.map((option) => option.value) : []
// //     );
// //   };

// //   const handleEditGroupHeadChange = (selectedOption) => {
// //     setGroupHead(selectedOption);
// //     setValueEdit("team_head", selectedOption ? selectedOption.value : "");
// //   };

  
// //   const handleEditMembersChange = (selectedOptions) => {
// //     const selectedValues = selectedOptions
// //       ? selectedOptions.map((option) => option.value)
// //       : [];
// //     setMembers(selectedOptions);
// //     setValueEdit("members", selectedValues);
// //     trigger("members"); 
// //   };

// //   const onEdit = (team) => {
// //     setIsEditFormVisible(true);
// //     setEditGroupData(team);

// //     setValueEdit("department_name", team.department_name);

// //     const selectedGroupHead = managerOptions.find(
// //       (option) => option.label === team.team_head
// //     );

// //     setGroupHead(selectedGroupHead || null);
// //     setValueEdit(
// //       "team_head",
// //       selectedGroupHead ? selectedGroupHead.value : null
// //     );

// //     const selectedMembers = team.members
// //       ? team.members.map((member) =>
// //           employeeOptions.find((option) => option.value === member.id)
// //         )
// //       : [];
// //     setMembers(selectedMembers);
// //     setValueEdit(
// //       "members",
// //       team.members ? team.members.map((member) => member.id) : []
// //     );
// //   };

// //   const onUpdate = async (data) => {
// //     const isFormValid = await trigger();
// //     if (isFormValid) {
// //       if (token && editGroupData) {
// //         dispatch(updateGroup({ token, id: editGroupData.id, values: data }));
// //       }
// //       setIsEditFormVisible(false);
// //       resetEdit();
// //       setGroupHead(null);
// //       setMembers([]);
// //     }
// //   };

// //   useEffect(() => {
// //     if (updategroup) {
// //       alert("Team updated successfully");
// //       setIsEditFormVisible(false);
// //       resetEdit();
// //       setGroupHead(null);
// //       setMembers([]);
// //     } else if (updateGroupError) {
// //       const errorMessage = updateGroupError.error.replace(/[\[\]']+/g, "");
// //       alert(`Error: ${errorMessage}`);
// //     }
// //   }, [updategroup, updateGroupError]);

// //   const handleFormSubmit = async (data) => {
// //     dispatch(addGroup(token, data));
// //     setIsAddFormVisible(false);
// //     resetAdd();
// //     setGroupHead(null);
// //     setMembers([]);
// //   };

// //   useEffect(() => {
// //     if (addgroup) {
// //       alert("Team created successfully");
// //       setIsAddFormVisible(false);
// //       resetAdd();
// //       setGroupHead(null);
// //       setMembers([]);
// //     } else if (addGroupError) {
// //       const errorMessage = addGroupError.error.replace(/[\[\]']+/g, "");
// //       alert(`Error: ${errorMessage}`);
// //     }
// //   }, [addgroup, addGroupError]);

// //   useEffect(() => {
// //     if (token) {
// //       dispatch(getallgroupData(token));
// //       dispatch(getallemployeeData(token));
// //       dispatch(getEmployees(token));
// //       dispatch(getManagers(token));
// //     }
// //   }, [dispatch, token]);

// //   useEffect(() => {
// //     if (isAddFormVisible) {
// //       resetAdd();
// //       setGroupHead(null);
// //       setMembers([]);
// //     } else if (isEditFormVisible) {
// //       resetEdit();
// //     }
// //   }, [isAddFormVisible]);

// //   useEffect(() => {
// //     if (addgroup || updategroup) {
// //       dispatch(getallgroupData(token));
// //       resetAdd();
// //       resetEdit();
// //       setGroupHead(null);
// //       setMembers([]);
// //     }
// //   }, [dispatch, addgroup, updategroup, token]);

// //   const employeeOptions = employeeList?.map((member) => ({
// //     value: member.id,
// //     label: `${member.first_name} ${member.last_name}`,
// //   }));

// //   const managerOptions = managers?.map((manager) => ({
// //     value: manager.id,
// //     label: `${manager.first_name} ${manager.last_name}`,
// //   }));

// //   return (
// //     <>
// //       <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
// //         <Header onMenuClick={() => setMenu(!menu)} />
// //         <Sidebar />
// //         <div className="page-wrapper">
// //           <Helmet>
// //             <title>Monitor - Activity Tracker</title>
// //             <meta name="description" content="Login page" />
// //           </Helmet>
// //           <div className="content container-fluid">
// //             <div className="page-header">
// //               <div className="row align-items-center">
// //                 <div className="col">
// //                   <h3 className="page-title">Activity Tracker</h3>
// //                   <ul className="breadcrumb">
// //                     <li className="breadcrumb-item">
// //                       <Link to="/app/main/dashboard">Dashboard</Link>
// //                     </li>
// //                     <li className="breadcrumb-item active">Activity Tracker</li>
// //                   </ul>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="card">
// //               <div className="card-body">
// //                 <div className="row">
// //                   <div className="col">
// //                     <h5 className="page-title">All Teams</h5>
// //                   </div>
// //                   <div className="col">
// //                     <button
// //                       className="btn btn-primary"
// //                       onClick={() => setIsAddFormVisible(true)}
// //                       style={{ float: "right" }}
// //                     >
// //                       Add Team
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="row staff-grid-row">
// //               {groupdata?.map((team, index) => (
// //                 <div
// //                   key={index}
// //                   className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
// //                 >
// //                   <div className="profile-widget">
// //                     <div className="profile">
// //                       <Link
// //                         to={`/app/groupprofile/groups-profile/${team?.id}`}
// //                       ></Link>
// //                     </div>
// //                     <h4 className="">
// //                       <Link to={`/app/groupprofile/groups-profile/${team?.id}`}>
// //                         Team Head - {team?.team_head}
// //                       </Link>
// //                     </h4>
// //                     <div className="small text-muted">
// //                       <p>Members - {team?.members_count}</p>
// //                     </div>

// //                     <div className="dropdown profile-action">
// //                       <Link
// //                         to="#"
// //                         className="action-icon dropdown-toggle"
// //                         data-bs-toggle="dropdown"
// //                         aria-expanded="false"
// //                       >
// //                         <i className="material-icons">more_vert</i>
// //                       </Link>
// //                       <div className="dropdown-menu dropdown-menu-right">
// //                         <Link
// //                           className="dropdown-item"
// //                           to="#"
// //                           onClick={() => onEdit(team)}
// //                         >
// //                           <i className="fa fa-pencil m-r-5" /> Edit
// //                         </Link>
// //                       </div>
// //                     </div>
// //                     <h4 className="user-name m-t-10 mb-0 text-ellipsis">
// //                       <Link to={`/app/groupprofile/groups-profile/${team?.id}`}>
// //                         {team?.department_name}
// //                       </Link>
// //                     </h4>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Add Group Modal */}
// //           <div
// //             id="add_grouop_modal"
// //             className={`modal custom-modal fade ${
// //               isAddFormVisible ? "show" : ""
// //             }`}
// //             role="dialog"
// //             style={{
// //               display: isAddFormVisible ? "block" : "none",
// //               backgroundColor: "rgba(0, 0, 0, 0.5)",
// //             }}
// //           >
// //             <div className="modal-dialog modal-dialog-centered" role="document">
// //               <div className="modal-content">
// //                 <div className="modal-header">
// //                   <h5 className="modal-title">Add Team</h5>
// //                   <button
// //                     type="button"
// //                     className="close"
// //                     aria-label="Close"
// //                     onClick={() => setIsAddFormVisible(false)}
// //                   >
// //                     <span aria-hidden="true">&times;</span>
// //                   </button>
// //                 </div>
// //                 <div className="modal-body">
// //                   <form onSubmit={handleSubmitAdd(handleFormSubmit)}>
// //                     <div className="row">
// //                       <div className="col-sm-12">
// //                         <div className="input-block">
// //                           <label>Department Name</label>
// //                           <input
// //                             type="text"
// //                             className={`form-control ${
// //                               errorsAdd.department_name ? "is-invalid" : ""
// //                             }`}
// //                             {...registerAdd("department_name")}
// //                           />
// //                           <div className="invalid-feedback">
// //                             {errorsAdd.department_name?.message}
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="col-sm-12">
// //                         <div className="input-block">
// //                           <label>Team Head</label>
// //                           <Select
// //                             options={managerOptions}
// //                             value={groupHead}
// //                             onChange={handleGroupHeadChange}
// //                             isClearable
// //                             className={`${
// //                               errorsAdd.team_head ? "is-invalid" : ""
// //                             }`}
// //                           />
// //                           <div className="invalid-feedback">
// //                             {errorsAdd.team_head?.message}
// //                           </div>
// //                         </div>
// //                         <div className="input-block">
// //                           <label>Members</label>
// //                           <Select
// //                             options={employeeOptions}
// //                             value={members}
// //                             onChange={handleMembersChange}
// //                             isMulti
// //                             className={`${
// //                               errorsAdd.members ? "is-invalid" : ""
// //                             }`}
// //                           />
// //                           <div className="invalid-feedback">
// //                             {errorsAdd.members?.message}
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="submit-section">
// //                         <button className="btn btn-primary" type="submit">
// //                           Submit
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </form>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Edit Group Modal */}
// //           <div
// //             id="edit_group_modal"
// //             className={`modal custom-modal fade ${
// //               isEditFormVisible ? "show" : ""
// //             }`}
// //             role="dialog"
// //             style={{
// //               display: isEditFormVisible ? "block" : "none",
// //               backgroundColor: "rgba(0, 0, 0, 0.5)",
// //             }}
// //           >
// //             <div className="modal-dialog modal-dialog-centered" role="document">
// //               <div className="modal-content">
// //                 <div className="modal-header">
// //                   <h5 className="modal-title">Edit Team</h5>
// //                   <button
// //                     type="button"
// //                     className="close"
// //                     aria-label="Close"
// //                     onClick={() => setIsEditFormVisible(false)}
// //                   >
// //                     <span aria-hidden="true">&times;</span>
// //                   </button>
// //                 </div>
// //                 <div className="modal-body">
// //                   <form onSubmit={handleSubmitEdit(onUpdate)}>
// //                     <div className="row">
// //                       <div className="col-sm-12">
// //                         <div className="input-block">
// //                           <label>Department Name</label>
// //                           <input
// //                             type="text"
// //                             className={`form-control ${
// //                               errorsEdit.department_name ? "is-invalid" : ""
// //                             }`}
// //                             {...registerEdit("department_name")}
// //                           />
// //                           <div className="invalid-feedback">
// //                             {errorsEdit.department_name?.message}
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="col-sm-12">
// //                         <div className="input-block">
// //                           <label>Team Head</label>
// //                           <Select
// //                             options={managerOptions}
// //                             value={groupHead}
// //                             onChange={handleEditGroupHeadChange}
// //                             isClearable
// //                             className={`${
// //                               errorsEdit.team_head ? "is-invalid" : ""
// //                             }`}
// //                           />
// //                           <div className="invalid-feedback">
// //                             {errorsEdit.team_head?.message}
// //                           </div>
// //                         </div>
// //                         <div className="input-block">
// //                           <label>Members</label>
// //                           <Select
// //                             options={employeeOptions}
// //                             value={members}
// //                             onChange={handleEditMembersChange}
// //                             isMulti
// //                             className={`${
// //                               errorsEdit.members ? "is-invalid" : ""
// //                             }`}
// //                           />
// //                           <div className="invalid-feedback">
// //                             {errorsEdit.members?.message}
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="submit-section">
// //                         <button className="btn btn-primary" type="submit">
// //                           Update
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </form>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AllGroups;
