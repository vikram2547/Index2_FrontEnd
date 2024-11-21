// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Offcanvas from "../../../Entryfile/offcanvance";
// import { useDispatch, useSelector } from "react-redux";
// import { getScreenshots } from "../../../store/allscreenshots";
// import { getActivity } from "../../../store/activity";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import {
//   Table,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
// } from "reactstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { getActivityByDate } from "../../../store/activitybydate";

// const EmployeeActivity = () => {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const { id } = params;

//   const [showFilterOptions, setShowFilterOptions] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);
//   const [activityModal, setActivityModal] = useState(false);
//   const [screenshotsModal, setScreenshotsModal] = useState(false);
//   const [activeActivityIndex, setActiveActivityIndex] = useState(0);
//   const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);

//   const screenshots = useSelector((state) => state.allscreenshots.data || []);
//   const activity = useSelector((state) => state.activity.data || []);
//   const bydate = useSelector((state) => state.activitybydate.bydate || []);
//   const token = useSelector((state) => state.login.token);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return "Invalid Date";
//     }
//     const options = { year: "numeric", month: "2-digit", day: "2-digit" };
//     return date.toLocaleDateString("en-GB", options);
//   };

//   const formatTime = (timeString) => {
//     return timeString.split("T")[1].split(".")[0];
//   };

//   useEffect(() => {
//     if (token && id) {
//       dispatch(getScreenshots(token, id));
//       dispatch(getActivity(token, id));
//     }
//   }, [token, id, dispatch]);

//   useEffect(() => {
//     if (token && id && endDate) {
//       const dateRangeParams = {
//         start_date: startDate.toISOString().split("T")[0],
//         end_date: endDate.toISOString().split("T")[0],
//       };
//       dispatch(getActivityByDate(token, id, dateRangeParams));
//     }
//   }, [endDate, token, id, dispatch, startDate]);

//   const handleSearchClick = () => {
//     setShowFilterOptions(true);
//   };

//   const handleClearFilter = () => {
//     setStartDate(new Date());
//     setEndDate(null);
//     dispatch(getActivity(token, id));
//   };

//   const filteredActivity = endDate ? bydate : activity;

//   const toggleActivityModal = (index) => {
//     setActiveActivityIndex(index);
//     setActivityModal(!activityModal);
//   };
//   const toggleScreenshotsModal = (index) => {
//     setActiveScreenshotIndex(index);
//     setScreenshotsModal(!screenshotsModal);
//   };

//   const handleScreenshotsNext = () => {
//     setActiveScreenshotIndex(
//       (prevIndex) => (prevIndex + 1) % (screenshots.activity?.length || 1)
//     );
//   };

//   const handleScreenshotsPrevious = () => {
//     setActiveScreenshotIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + (screenshots.activity?.length || 1)) %
//         (screenshots.activity?.length || 1)
//     );
//   };

//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content container-fluid">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <button
//               onClick={handleSearchClick}
//               className="btn btn-success me-2"
//             >
//               Filter
//             </button>
//             <button onClick={handleClearFilter} className="btn btn-secondary">
//               Clear Filter
//             </button>
//             <div className="ms-auto">
//               <Link
//                 to={`/app/profile/employee-profile/${id}`}
//                 className="btn btn-primary"
//               >
//                 Back
//               </Link>
//             </div>
//           </div>
//           {showFilterOptions && (
//             <div className="row">
//               <div className="col-sm-2">
//                 <label htmlFor="startDate" className="form-label me-2">
//                   Start Date:
//                 </label>
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   selectsStart
//                   startDate={startDate}
//                   endDate={endDate}
//                   dateFormat="yyyy-MM-dd"
//                   className="form-control"
//                   id="startDate"
//                 />
//               </div>
//               <div className="col-sm-2">
//                 <label htmlFor="endDate" className="form-label me-2">
//                   End Date:
//                 </label>
//                 <DatePicker
//                   selected={endDate}
//                   onChange={(date) => setEndDate(date)}
//                   selectsEnd
//                   startDate={startDate}
//                   endDate={endDate}
//                   minDate={startDate}
//                   dateFormat="yyyy-MM-dd"
//                   className="form-control"
//                   id="endDate"
//                 />
//               </div>
//             </div>
//           )}
//           <br></br>

//           <div className="card tab-box">
//             <div className="row user-tabs">
//               <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
//                 <ul className="nav nav-tabs nav-tabs-bottom">
//                   <li className="nav-item">
//                     <Link
//                       to="#emp_livescreen"
//                       data-bs-toggle="tab"
//                       className="nav-link"
//                     >
//                       Live Screen
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       to="#emp_screenshots"
//                       data-bs-toggle="tab"
//                       className="nav-link"
//                     >
//                       Screenshots
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       to="#emp_recordings"
//                       data-bs-toggle="tab"
//                       className="nav-link"
//                     >
//                       Screen Recordings
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       to="#user_activity"
//                       data-bs-toggle="tab"
//                       className="nav-link active"
//                     >
//                       Activity
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="tab-content">
//             <div className="tab-pane fade" id="emp_screenshots">
//               <div className="row">
//                 {screenshots?.activity?.length > 0 ? (
//                   screenshots?.activity?.map(
//                     (activity, index) =>
//                       activity.screenshots && (
//                         <div
//                           className="col-12 col-sm-6 col-md-4 mb-3"
//                           key={activity.id}
//                         >
//                           <div
//                             className="card"
//                             onClick={() => toggleScreenshotsModal(index)}
//                           >
//                             <img
//                               src={`http://103.86.182.148:8000${activity.screenshots}`}
//                               className="card-img-top"
//                               alt={`Screenshot ${activity.id}`}
//                               style={{
//                                 cursor: "pointer",
//                                 height: "150px",
//                                 objectFit: "cover",
//                               }}
//                             />
//                             <div className="card-body">
//                               <p className="card-text">
//                                 {`Screenshot from ${new Date(
//                                   activity.date
//                                 ).toLocaleString()}`}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       )
//                   )
//                 ) : (
//                   <div className="col text-center">
//                     <p>No screenshots available</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="tab-pane fade" id="emp_recordings">
//               <div className="row">
//                 <div className="col text-center">
//                   <p>No screen recordings available</p>
//                 </div>
//               </div>
//             </div>

//             <div
//               id="user_activity"
//               className="pro-overview tab-pane fade show active"
//             >
//               <div className="user_asset">
//                 <div className="table-responsive">
//                   <Table className="text-nowrap align-middle mb-0" hover>
//                     <thead>
//                       <tr>
//                         <th>Sr.No</th>
//                         <th>Window Title</th>
//                         <th>Screenshot</th>
//                         <th>Date</th>
//                         <th>Start Time</th>
//                         <th>End Time</th>
//                         <th>Duration</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredActivity.length > 0 ? (
//                         filteredActivity.map((tdata, index) => (
//                           <tr key={tdata.id} className="border-top">
//                             <td>
//                               <h6 className="mb-0">{tdata.id}</h6>
//                             </td>
//                             <td>
//                               <h6 className="mb-0">{tdata.window_title}</h6>
//                             </td>
//                             <td>
//                               <img
//                                 alt=""
//                                 src={`http://103.86.182.148:8000${tdata.screenshot}`}
//                                 style={{
//                                   width: "100px",
//                                   height: "auto",
//                                   cursor: "pointer",
//                                 }}
//                                 onClick={() => toggleActivityModal(index)}
//                               />
//                             </td>
//                             <td>{formatDate(tdata.date)}</td>
//                             <td>{formatTime(tdata.start_time)}</td>
//                             <td>{formatTime(tdata.end_time)}</td>
//                             <td>{tdata.duration}</td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="6" className="text-center">
//                             No data available
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </Table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal
//         isOpen={activityModal}
//         toggle={() => setActivityModal(!activityModal)}
//         size="lg"
//       >
//         <ModalHeader
//           toggle={() => setActivityModal(!activityModal)}
//           className="d-flex justify-content-center"
//         >
//           Activity Details
//         </ModalHeader>
//         <ModalBody className="text-center">
//           {filteredActivity && filteredActivity[activeActivityIndex] && (
//             <>
//               <h5>
//                 Window Title:{" "}
//                 {filteredActivity[activeActivityIndex].window_title}
//               </h5>
//               <p>
//                 Date: {formatDate(filteredActivity[activeActivityIndex].date)}
//               </p>
//               <img
//                 alt=""
//                 src={`http://103.86.182.148:8000${filteredActivity[activeActivityIndex].screenshot}`}
//                 style={{ maxWidth: "100%", maxHeight: "400px" }}
//               />
//             </>
//           )}
//         </ModalBody>
//       </Modal>

//       <Modal
//         isOpen={screenshotsModal}
//         toggle={() => setScreenshotsModal(!screenshotsModal)}
//         size="lg"
//       >
//         <ModalHeader toggle={() => setScreenshotsModal(!screenshotsModal)}>
//           Screenshot {activeScreenshotIndex + 1} of{" "}
//           {screenshots.activity?.length || 0}
//         </ModalHeader>
//         <ModalBody className="text-center">
//           {screenshots.activity?.length > 0 ? (
//             <>
//               <p>
//                 Date & Time :{" "}
//                 {`Screenshot from ${new Date(
//                   screenshots.activity[activeScreenshotIndex]?.date
//                 ).toLocaleString()}`}
//               </p>
//               <img
//                 src={`http://103.86.182.148:8000${
//                   screenshots.activity[activeScreenshotIndex]?.screenshots || ""
//                 }`}
//                 alt={`Screenshot ${activeScreenshotIndex + 1}`}
//                 style={{ width: "100%", height: "auto" }}
//               />
//             </>
//           ) : (
//             <p>No screenshots available</p>
//           )}
//         </ModalBody>
//         {screenshots.activity?.length > 1 && (
//           <ModalFooter className="d-flex justify-content-between">
//             <Button color="secondary" onClick={handleScreenshotsPrevious}>
//               Previous
//             </Button>
//             <Button color="secondary" onClick={handleScreenshotsNext}>
//               Next
//             </Button>
//           </ModalFooter>
//         )}
//       </Modal>

//       <Offcanvas />
//     </>
//   );
// };

// export default EmployeeActivity;
