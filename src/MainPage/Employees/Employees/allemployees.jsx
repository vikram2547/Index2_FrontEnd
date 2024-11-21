// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import Sidebar from "../../../initialpage/Sidebar/sidebar";
// import Header from "../../../initialpage/Sidebar/header";
// import Offcanvas from "../../../Entryfile/offcanvance";
// import { useDispatch, useSelector } from "react-redux";
// import { getallemployeeData } from "../../../store/allemployee";
// import { addUserData } from "../../../store/adduser";
// import { getreportData } from "../../../store/reportsto";
// import { useForm } from "react-hook-form";
// import { updateUser } from "../../../store/updateuser";
// import { getManagers } from "../../../store/allmanagers";

// const AllEmployees = () => {
//   const dispatch = useDispatch();
//   const [menu, setMenu] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [editUserData, setEditUserData] = useState(null);
//   const [isEditFormVisible, setIsEditFormVisible] = useState(false);
//   const [file, setFile] = useState(null);
//   const [reportTo, setReportTo] = useState(null);
//   const toggleMobileMenu = () => {
//     setMenu(!menu);
//   };
//   const employeeData = useSelector((state) => state.allemployee.employeeData?.users);
//   const token = useSelector((state) => state.login.token);
//   const managers = useSelector((state) => state.allmanagers.managers);
//   const users = useSelector((state) => state.adduserSlice.user);
//   console.log(users,"user");

//   const updateusers = useSelector((state) => state.updateuser.updateusers);

//   const { register, handleSubmit, setValue, reset } = useForm();
//   const {
//     register: registerAddUser,
//     handleSubmit: handleSubmitAddUser,
//     setValue: setValueAddUser,
//     reset: resetAddUser,

//   } = useForm();

//   const handleChange = (e) => {
//     if (!e.target) return;
//     const { name, value, type, files, checked } = e.target;

//     if (type === "file") {
//       setFile(files[0]);
//       setPreviewImage(URL.createObjectURL(files[0]));
//     } else if (type === "checkbox") {
//       setValueAddUser(name, checked);
//       setValue(name, checked);
//     } else {
//       setValueAddUser(name, value);
//       setValue(name, value);
//     }
//   };

//   const handleUpdateChange = (e) => {
//     if (!e.target) return;
//     const { type, files } = e.target;

//     if (type === "file") {
//       setFile(files[0]);
//       setPreviewImage(URL.createObjectURL(files[0]));
//     }
//   };

//   const onEdit = (employee) => {
//     setIsEditFormVisible(true);
//     setEditUserData(employee);
//     setPreviewImage(
//       employee?.profile_picture
//         ? `http://103.86.182.148:8000${employee?.profile_picture}`
//         : null
//     );
//     setValue("email", employee.email);
//     setValue("first_name", employee.first_name);
//     setValue("last_name", employee.last_name);
//     setValue("phone", employee.phone);
//     setValue("address", employee.address);
//     setValue("profile_picture", employee.profile_picture);
//     setValue("reports_to", employee.reports_to);
//   };

//   const onUpdate = (data) => {
//     if (token && editUserData) {
//       const formData = new FormData();
//       formData.append("email", data.email);
//       formData.append("first_name", data.first_name);
//       formData.append("last_name", data.last_name);
//       formData.append("phone", data.phone);
//       formData.append("address", data.address);
//       formData.append("reports_to", data.reports_to);
//       if (file) {
//         formData.append("profile_picture", file);
//       }
//       dispatch(updateUser({ token, id: editUserData.id, values: formData }));
//     }
//     setIsEditFormVisible(false);
//     reset();
//   };

//   const handleFormSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("email", data.email);
//     formData.append("password", data.password);
//     formData.append("confirmPassword", data.confirmPassword);
//     formData.append("first_name", data.first_name);
//     formData.append("last_name", data.last_name);
//     formData.append("phone", data.phone);
//     formData.append("address", data.address);
//     formData.append("gender", data.gender);
//     formData.append("profile_picture", file);
//     formData.append("reports_to", data.reports_to);
//     formData.append(
//       "is_company_manager",
//       data.is_company_manager ? "true" : "false"
//     );

//     try {
//       const response = await  dispatch(addUserData(token, formData));

//       if (response.error) {
//         alert(response.error.message || "An error occurred");
//       } else {
//         closeModal();
//         alert("User added successfully");
//         resetAddUser();
//       }
//     } catch (error) {
//       alert("An unexpected error occurred");
//       resetAddUser();
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       dispatch(getreportData(token));
//       dispatch(getallemployeeData(token));
//       dispatch(getManagers(token));
//     }
//   }, [dispatch, token]);

//   useEffect(() => {
//     if (users || updateusers) {
//       dispatch(getallemployeeData(token));
//     }
//   }, [dispatch, users, updateusers]);

// const closeModal = () => {
//   const modal = document.getElementById("add_employee_modal");
//   if (modal) {
//     modal.classList.remove("hide");
//     modal.style.display = "none";
//     const modalBackdrop =
//       document.getElementsByClassName("modal-backdrop")[0];
//     if (modalBackdrop) {
//       modalBackdrop.parentNode.removeChild(modalBackdrop);
//     }
//   }
// };

//   return (
//     <>
//       <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
//         <Header onMenuClick={() => toggleMobileMenu()} />
//         <Sidebar />
//         <div className="page-wrapper">
//           <Helmet>
//             <title>Monitor -Activity Tracker</title>
//             <meta name="description" content="Login page" />
//           </Helmet>
//           {/* Page Content */}
//           <div className="content container-fluid">
//             {/* Page Header */}
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
//                     <h5 className="page-title">All Employees</h5>
//                   </div>
//                   <div className="col">
//                     <button
//                       className="btn btn-primary"
//                       data-bs-toggle="modal"
//                       data-bs-target="#add_employee_modal"
//                       style={{ float: "right" }}
//                     >
//                       Add User
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* /Page Header */}

//             <div className="row staff-grid-row">
//               {employeeData?.map((employee, index) => (
//                 <div
//                   key={index}
//                   className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
//                 >
//                   <div className="profile-widget">
//                     <div className="profile-img">
//                       <Link
//                         to={`/app/profile/employee-profile/${employee?.id}`}
//                         className="avatar"
//                       >
//                         <img
//                           src={
//                             employee?.profile_picture
//                               ? `http://103.86.182.148:8000${employee?.profile_picture}`
//                               : "path_to_default_avatar"
//                           }
//                           alt=""
//                         />
//                         {/* Online status indicator */}
//                         {employee.is_online ? (
//                           <i className="fas fa-circle text-success profile-status-icon"></i>
//                         ) : (
//                           <i className="fas fa-circle text-danger profile-status-icon"></i>
//                         )}
//                       </Link>
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
//                           data-bs-toggle="modal"
//                           data-bs-target="#edit_employee"
//                           onClick={() => onEdit(employee)}
//                         >
//                           <i className="fa fa-pencil m-r-5" /> Edit
//                         </Link>

//                       </div>
//                     </div>
//                     <h4 className="user-name m-t-10 mb-0 text-ellipsis">
//                       <Link
//                         to={`/app/profile/employee-profile/${employee?.id}`}
//                       >
//                         {employee?.first_name} {employee?.last_name}
//                       </Link>
//                     </h4>
//                     <div className="small text-muted">
//                       {employee?.company?.name}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div
//             id="add_employee_modal"
//             className="modal custom-modal fade"
//             role="dialog"
//           >
//             <div
//               className="modal-dialog modal-dialog-centered modal-lg"
//               role="document"
//             >
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Add New Employee</h5>
//                   <button
//                     type="button"
//                     className="close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   >
//                     <span aria-hidden="true">×</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleSubmitAddUser(handleFormSubmit)}>
//                     <div className="row">
//                       <div className="col-sm-6">
//                         <div className="input-block">
//                           <label>Email</label>
//                           <input
//                             className="form-control"
//                             type="email"
//                             required
//                             {...registerAddUser("email", {

//                             })}
//                           />
//                         </div>
//                         <div className="input-block">
//                           <label>Password</label>
//                           <input
//                             className="form-control"
//                             type="password"
//                             required
//                             {...registerAddUser("password", {

//                             })}
//                           />
//                         </div>
//                         <div className="input-block">
//                           <label>Confirm Password</label>
//                           <input
//                             className="form-control"
//                             type="password"
//                             required
//                             {...registerAddUser("confirmPassword", {

//                             })}
//                           />
//                         </div>
//                         <div className="input-block">
//                           <label>First Name</label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             required
//                             {...registerAddUser("first_name", {

//                             })}
//                           />
//                         </div>
//                         <div className="input-block">
//                           <label>Last Name</label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             required
//                             {...registerAddUser("last_name", {

//                             })}
//                           />
//                         </div>

//                       </div>
//                       <div className="col-sm-6">
//                         <div className="input-block">
//                           <label>Phone</label>
//                           <input
//                             className="form-control"
//                             type="tel"
//                             required
//                             {...registerAddUser("phone", {

//                             })}
//                           />
//                         </div>

//                         <div className="input-block">
//                           <label>Address</label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             required
//                             {...registerAddUser("address", {

//                             })}
//                           />
//                         </div>
//                         <div className="input-block">
//                           <label>Gender</label>
//                           <select
//                             className="form-control"
//                             required
//                             {...registerAddUser("gender", {

//                             })}
//                           >
//                             <option value="">Select Gender</option>
//                             <option value="M">Male</option>
//                             <option value="F">Female</option>
//                             <option value="T">Transgender</option>
//                           </select>
//                         </div>
//                         <div className="input-block">
//                           <label>Reports To</label>
//                           <select
//                             className="form-control"
//                             required
//                             {...registerAddUser("reports_to", {

//                             })}
//                           >
//                             <option value="">Select Manager</option>
//                             {managers.map((manager) => (
//                               <option key={manager.id} value={manager.id}>
//                                 {manager.first_name} {manager.last_name}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="input-block">
//                           <label>Profile Picture</label>
//                           <input
//                             className="form-control"
//                             type="file"
//                             name="profile_picture"
//                             accept="image/*"
//                             onChange={handleChange}
//                           />
//                           {previewImage && (
//                             <img
//                               src={previewImage}
//                               alt="Preview"
//                               style={{ maxWidth: "40%", marginTop: "5px" }}
//                             />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="submit-section">
//                       <button
//                         className="btn btn-primary submit-btn"
//                         type="submit"
//                         data-bs-dismiss="modal"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* /Add user Modal */}

//           <div
//             id="edit_employee"
//             className="modal custom-modal fade"
//             role="dialog"
//           >
//             <div
//               className="modal-dialog modal-dialog-centered modal-lg"
//               role="document"
//             >
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Update Employee</h5>
//                   <button
//                     type="button"
//                     className="close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   >
//                     <span aria-hidden="true">×</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleSubmit(onUpdate)}>
//                     <div className="row">
//                       <div className="col-sm-6">
//                         <div className="input-block">
//                           <label>Email</label>
//                           <input
//                             className="form-control"
//                             type="email"
//                             required
//                             {...register("email", {

//                             })}
//                           />
//                         </div>

//                         <div className="input-block">
//                           <label>First Name</label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             required
//                             {...register("first_name", {

//                             })}
//                           />
//                         </div>
//                         <div className="input-block">
//                           <label>Last Name</label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             required
//                             {...register("last_name", {

//                             })}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-sm-6">
//                         <div className="input-block">
//                           <label>Phone</label>
//                           <input
//                             className="form-control"
//                             type="tel"
//                             required
//                             {...register("phone", {

//                             })}
//                           />
//                         </div>

//                         <div className="input-block">
//                           <label>Address</label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             required
//                             {...register("address", {

//                             })}
//                           />
//                         </div>

//                         <div className="input-block">
//                           <label>Reports To</label>
//                           <select
//                             className="form-control"
//                             required
//                             {...register("reports_to", {

//                             })}
//                             value={reportTo}
//                           >
//                             <option value="">Select Manager</option>
//                             {managers.map((manager) => (
//                               <option key={manager.id} value={manager.id}>
//                                 {manager.first_name} {manager.last_name}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="input-block">
//                           <label>Profile Picture</label>
//                           <input
//                             className="form-control"
//                             type="file"
//                             name="profile_picture"
//                             accept="image/*"
//                             onChange={handleUpdateChange}
//                           />
//                           {previewImage && (
//                             <img
//                               src={previewImage}
//                               alt="Preview"
//                               style={{ maxWidth: "40%", marginTop: "5px" }}
//                             />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="submit-section">
//                       <button
//                         className="btn btn-primary submit-btn"
//                         type="submit"
//                         data-bs-dismiss="modal"
//                       >
//                         Update
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Offcanvas />
//     </>
//   );
// };

// export default AllEmployees;
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Header from "../../../initialpage/Sidebar/header";
import Offcanvas from "../../../Entryfile/offcanvance";
import { useDispatch, useSelector } from "react-redux";
import { getallemployeeData } from "../../../store/allemployee";
import { addUserData } from "../../../store/adduser";
import { getreportData } from "../../../store/reportsto";
import { useForm } from "react-hook-form";
import { updateUser } from "../../../store/updateuser";
import { getManagers } from "../../../store/allmanagers";
import { addEmployeeSchema, editEmployeeSchema } from "./schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../Groups/Groups/allgroups.css";

const AllEmployees = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [editUserData, setEditUserData] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [reportTo, setReportTo] = useState(null);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const employeeData = useSelector(
    (state) => state.allemployee.employeeData?.users
  );
  const token = useSelector((state) => state.login.token);
  const managers = useSelector((state) => state.allmanagers.managers);
  const users = useSelector((state) => state.adduserSlice.user);
  const addUsersError = useSelector((state) => state.adduserSlice.error);
  const updateusers = useSelector((state) => state.updateuser.updateusers);
  const updateUsersError = useSelector((state) => state.updateuser.error);

  const {
    register: registerAddUser,
    handleSubmit: handleSubmitAddUser,
    setValue: setValueAddUser,
    reset: resetAdd,
    formState: { errors: addUserErrors },
  } = useForm({
    resolver: yupResolver(addEmployeeSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset: resetEdit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editEmployeeSchema),
  });

  const handleChange = (e) => {
    if (!e.target) return;
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setFile(files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      setValueAddUser(name, checked);
      setValue(name, checked);
    } else {
      setValueAddUser(name, value);
      setValue(name, value);
    }
  };

  const handleUpdateChange = (e) => {
    if (!e.target) return;
    const { type, files } = e.target;

    if (type === "file") {
      setFile(files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    }
  };

  const onEdit = (employee) => {
    setIsEditFormVisible(true);
    setEditUserData(employee);
    setPreviewImage(
      employee?.profile_picture
        ? `http://103.86.182.148:8000${employee?.profile_picture}`
        : null
    );
    setValue("email", employee.email);
    setValue("first_name", employee.first_name);
    setValue("last_name", employee.last_name);
    setValue("phone", employee.phone);
    setValue("address", employee.address);
    setValue("profile_picture", employee.profile_picture);
    setValue("reports_to", employee.reports_to);
  };

  const onUpdate = (data) => {
    if (token && editUserData) {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("reports_to", data.reports_to);
      if (file) {
        formData.append("profile_picture", file);
      }
      dispatch(updateUser({ token, id: editUserData.id, values: formData }));
      if (updateusers) {
        alert("User updated successfully");
        setIsEditFormVisible(false);
        resetEdit();
      } else if (updateUsersError) {
        const errorMessage = updateUsersError.error.replace(/[\[\]']+/g, "");
        alert(`Error: ${errorMessage}`);
      }
    }
  };


  const handleFormSubmit = async (data) => {
    console.log("Form Submitted:", data);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("gender", data.gender);
    formData.append("profile_picture", file);
    formData.append("reports_to", data.reports_to);
    formData.append(
      "is_company_manager",
      data.is_company_manager ? "true" : "false"
    );

    dispatch(addUserData(token, formData));
    if (users) {
      alert("User added successfully");
      setIsAddFormVisible(false);
      resetAdd();
    } else if (addUsersError) {
      const errorMessage = addUsersError.error.replace(/[\[\]']+/g, "");
      alert(`Error: ${errorMessage}`);
    }
  };

  useEffect(() => {
    if (isAddFormVisible) {
      resetAdd();
    } else if (isEditFormVisible) {
      resetEdit();
    }
  }, [isAddFormVisible]);

  useEffect(() => {
    if (token) {
      dispatch(getreportData(token));
      dispatch(getallemployeeData(token));
      dispatch(getManagers(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (users || updateusers) {
      dispatch(getallemployeeData(token));
      resetAdd();
      resetEdit();
    }
  }, [dispatch, users, updateusers, token]);

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Monitor -Activity Tracker</title>
            <meta name="description" content="Login page" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Activity Tracker</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Activity Tracker</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="page-title">All Employees</h5>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsAddFormVisible(true)}
                      style={{ float: "right" }}
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* /Page Header */}

            <div className="row staff-grid-row">
              {employeeData?.map((employee, index) => (
                <div
                  key={index}
                  className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                >
                  <div className="profile-widget">
                    <div className="profile-img">
                      <Link
                        to={`/app/profile/employee-profile/${employee?.id}`}
                        className="avatar"
                      >
                        <img
                          src={
                            employee?.profile_picture
                              ? `http://103.86.182.148:8000${employee?.profile_picture}`
                              : "path_to_default_avatar"
                          }
                          alt=""
                        />
                        {/* Online status indicator */}
                        {employee.is_online ? (
                          <i className="fas fa-circle text-success profile-status-icon"></i>
                        ) : (
                          <i className="fas fa-circle text-danger profile-status-icon"></i>
                        )}
                      </Link>
                    </div>
                    <div className="dropdown profile-action">
                      <Link
                        to="#"
                        className="action-icon dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="material-icons">more_vert</i>
                      </Link>
                      <div className="dropdown-menu dropdown-menu-right">
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={() => onEdit(employee)}
                        >
                          <i className="fa fa-pencil m-r-5" /> Edit
                        </Link>
                      </div>
                    </div>
                    <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                      <Link
                        to={`/app/profile/employee-profile/${employee?.id}`}
                      >
                        {employee?.first_name} {employee?.last_name}
                      </Link>
                    </h4>
                    <div className="small text-muted">
                      {employee?.company?.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            id="add_employee_modal"
            className={`modal custom-modal fade ${
              isAddFormVisible ? "show" : ""
            }`}
            role="dialog"
            style={{
              display: isAddFormVisible ? "block" : "none",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Employee</h5>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => setIsAddFormVisible(false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmitAddUser(handleFormSubmit)}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="input-block">
                          <label>Email</label>
                          <input
                            className={`form-control ${
                              addUserErrors.email ? "is-invalid" : ""
                            }`}
                            type="email"
                            required
                            {...registerAddUser("email", {})}
                          />
                          {addUserErrors.email && (
                            <div className="invalid-feedback">
                              {addUserErrors.email.message}
                            </div>
                          )}
                        </div>
                        <div className="input-block">
                          <label>Password</label>
                          <input
                            className={`form-control ${
                              addUserErrors.password ? "is-invalid" : ""
                            }`}
                            type="password"
                            required
                            {...registerAddUser("password", {})}
                          />
                          {addUserErrors.password && (
                            <div className="invalid-feedback">
                              {addUserErrors.password.message}
                            </div>
                          )}
                        </div>
                        <div className="input-block">
                          <label>Confirm Password</label>
                          <input
                            className={`form-control ${
                              addUserErrors.confirmPassword ? "is-invalid" : ""
                            }`}
                            type="password"
                            required
                            {...registerAddUser("confirmPassword", {})}
                          />
                          {addUserErrors.confirmPassword && (
                            <div className="invalid-feedback">
                              {addUserErrors.confirmPassword.message}
                            </div>
                          )}
                        </div>
                        <div className="input-block">
                          <label>First Name</label>
                          <input
                            className={`form-control ${
                              addUserErrors.first_name ? "is-invalid" : ""
                            }`}
                            type="text"
                            required
                            {...registerAddUser("first_name", {})}
                          />
                          {addUserErrors.first_name && (
                            <div className="invalid-feedback">
                              {addUserErrors.first_name.message}
                            </div>
                          )}
                        </div>
                        <div className="input-block">
                          <label>Last Name</label>
                          <input
                            className={`form-control ${
                              addUserErrors.last_name ? "is-invalid" : ""
                            }`}
                            type="text"
                            required
                            {...registerAddUser("last_name", {})}
                          />
                          {addUserErrors.last_name && (
                            <div className="invalid-feedback">
                              {addUserErrors.last_name.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block">
                          <label>Phone</label>
                          <input
                            className={`form-control ${
                              addUserErrors.phone ? "is-invalid" : ""
                            }`}
                            type="tel"
                            required
                            {...registerAddUser("phone", {})}
                          />
                          {addUserErrors.phone && (
                            <div className="invalid-feedback">
                              {addUserErrors.phone.message}
                            </div>
                          )}
                        </div>

                        <div className="input-block">
                          <label>Address</label>
                          <input
                            className={`form-control ${
                              addUserErrors.address ? "is-invalid" : ""
                            }`}
                            type="text"
                            required
                            {...registerAddUser("address", {})}
                          />
                          {addUserErrors.address && (
                            <div className="invalid-feedback">
                              {addUserErrors.address.message}
                            </div>
                          )}
                        </div>
                        <div className="input-block">
                          <label>Gender</label>
                          <select
                            className={`form-control ${
                              addUserErrors.gender ? "is-invalid" : ""
                            }`}
                            required
                            {...registerAddUser("gender", {})}
                          >
                            {addUserErrors.gender && (
                              <div className="invalid-feedback">
                                {addUserErrors.gender.message}
                              </div>
                            )}
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="T">Transgender</option>
                          </select>
                        </div>
                        <div className="input-block">
                          <label>Reports To</label>
                          <select
                            className={`form-control ${
                              addUserErrors.reports_to ? "is-invalid" : ""
                            }`}
                            required
                            {...registerAddUser("reports_to", {})}
                          >
                            {addUserErrors.reports_to && (
                              <div className="invalid-feedback">
                                {addUserErrors.reports_to.message}
                              </div>
                            )}
                            <option value="">Select Manager</option>
                            {managers?.map((manager) => (
                              <option key={manager.id} value={manager.id}>
                                {manager.first_name} {manager.last_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="input-block">
                          <label>Profile Picture</label>
                          <input
                            className={`form-control ${
                              addUserErrors.profile_picture ? "is-invalid" : ""
                            }`}
                            type="file"
                            name="profile_picture"
                            accept="image/*"
                            onChange={handleChange}
                          />
                          {addUserErrors.profile_picture && (
                            <div className="invalid-feedback">
                              {addUserErrors.profile_picture.message}
                            </div>
                          )}
                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="Preview"
                              style={{ maxWidth: "40%", marginTop: "5px" }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        className="btn btn-primary submit-btn"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* /Add user Modal */}

          <div
            id="edit_employee"
            className={`modal custom-modal fade ${
              isEditFormVisible ? "show" : ""
            }`}
            role="dialog"
            style={{
              display: isEditFormVisible ? "block" : "none",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Employee</h5>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => setIsEditFormVisible(false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit(onUpdate)}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="input-block">
                          <label>Email</label>
                          <input
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            type="email"
                            required
                            {...register("email", {})}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email.message}
                            </div>
                          )}
                        </div>

                        <div className="input-block">
                          <label>First Name</label>
                          <input
                            className={`form-control ${
                              errors.first_name ? "is-invalid" : ""
                            }`}
                            type="text"
                            required
                            {...register("first_name", {})}
                          />
                          {errors.first_name && (
                            <div className="invalid-feedback">
                              {errors.first_name.message}
                            </div>
                          )}
                        </div>
                        <div className="input-block">
                          <label>Last Name</label>
                          <input
                            className={`form-control ${
                              errors.last_name ? "is-invalid" : ""
                            }`}
                            type="text"
                            required
                            {...register("last_name", {})}
                          />
                          {errors.last_name && (
                            <div className="invalid-feedback">
                              {errors.last_name.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-block">
                          <label>Phone</label>
                          <input
                            className={`form-control ${
                              errors.phone ? "is-invalid" : ""
                            }`}
                            type="tel"
                            required
                            {...register("phone", {})}
                          />
                          {errors.phone && (
                            <div className="invalid-feedback">
                              {errors.phone.message}
                            </div>
                          )}
                        </div>

                        <div className="input-block">
                          <label>Address</label>
                          <input
                            className={`form-control ${
                              errors.address ? "is-invalid" : ""
                            }`}
                            type="text"
                            required
                            {...register("address", {})}
                          />
                          {errors.address && (
                            <div className="invalid-feedback">
                              {errors.address.message}
                            </div>
                          )}
                        </div>

                        <div className="input-block">
                          <label>Reports To</label>
                          <select
                            className={`form-control ${
                              errors.reports_to ? "is-invalid" : ""
                            }`}
                            required
                            {...register("reports_to", {})}
                            value={reportTo}
                          >
                            {errors.reports_to && (
                              <div className="invalid-feedback">
                                {errors.reports_to.message}
                              </div>
                            )}
                            <option value="">Select Manager</option>
                            {managers?.map((manager) => (
                              <option key={manager.id} value={manager.id}>
                                {manager.first_name} {manager.last_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="input-block">
                          <label>Profile Picture</label>
                          <input
                            className={`form-control ${
                              errors.profile_picture ? "is-invalid" : ""
                            }`}
                            type="file"
                            name="profile_picture"
                            accept="image/*"
                            onChange={handleUpdateChange}
                          />
                          {errors.profile_picture && (
                            <div className="invalid-feedback">
                              {errors.profile_picture.message}
                            </div>
                          )}
                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="Preview"
                              style={{ maxWidth: "40%", marginTop: "5px" }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        className="btn btn-primary submit-btn"
                        type="submit"
                        data-bs-dismiss="modal"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas />
    </>
  );
};

export default AllEmployees;
