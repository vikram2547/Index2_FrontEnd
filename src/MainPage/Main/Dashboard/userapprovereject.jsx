// import React, { useState, useEffect } from "react";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css"; // Required styles
// import { pdfjs } from "react-pdf";
// import { API_HOST } from "../../../base_URL/http";
// import { Link, useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { message } from "antd";
// import { ResetApproveState, UserApprove } from "../../../store/userapprove";
// import { ResetRejectedState, UserReject } from "../../../store/userreject";


// function UserApproveReject() {
//   const [pdfSrc, setPdfSrc] = useState(""); // Store PDF file URL
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const token = useSelector((state) => state.login.token); // Retrieve token from Redux store
//   const approveResponse = useSelector((state) => state.userapprove.userapprove); // Get response from Approve action
//   const rejectResponse = useSelector((state) => state.userreject.userreject); // Get response from Reject action

//   useEffect(() => {
//     const storedpdfFileId = localStorage.getItem("UserPdfFileId");
//     if (storedpdfFileId) {
//       const fullFileUrl = `${API_HOST}scan/serve_tiff_as_pdf/${storedpdfFileId}/`;
//       setPdfSrc(fullFileUrl); // Set the PDF URL
//     }
//   }, []);

//   const dispatchApproveAction = () => {
//     const storedpdfFileId = localStorage.getItem("UserPdfFileId");
//     if (storedpdfFileId) {
//       dispatch(UserApprove(token, storedpdfFileId)); // Dispatch the Approve action
//     }
//   };

//   const dispatchRejectAction = () => {
//     const storedpdfFileId = localStorage.getItem("UserPdfFileId");
//     if (storedpdfFileId) {
//       dispatch(UserReject(token, storedpdfFileId)); // Dispatch the Reject action
//     }
//   };

//   useEffect(() => {
//     if (approveResponse?.message) {
//         message.success("File Approved.", 3);
//         dispatch(ResetApproveState());
//       history.push("/app/main/userqcchecked-files"); // Navigate to processed files
//     }
//   }, [approveResponse]);

//   useEffect(() => {
//     if (rejectResponse?.message) {
//         message.success("File Rejected.", 3);
//         dispatch(ResetRejectedState());
//       history.push("/app/main/userqcchecked-files"); // Navigate to processed files
//     }
//   }, [rejectResponse]);

//   useEffect(() => {
//     dispatch(ResetApproveState());
//     dispatch(ResetRejectedState());
// }, [dispatch]);

//   return (
//     <div>
//       <div className="page-wrapper">
//         <div className="content container-fluid">
//           {/* Page Header */}
//           <div className="page-header">
//             <div className="row align-items-center">
//               <div className="col">
//                 <h3 className="page-title">Files</h3>
//                 <ul className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <Link to="/app/main/dashboard">Dashboard</Link>
//                   </li>
//                   <li className="breadcrumb-item active">Tiff Files As Pdf</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="row align-items-center mb-4">
//             <div className="col-md-2">
//               <button
//                 className="btn btn-success btn-block"
//                 onClick={dispatchApproveAction} // Call the function that dispatches the approve action
//               >
//                 Approve
//               </button>
//             </div>

//             <div className="col-md-2">
//               <button
//                 className="btn btn-danger btn-block"
//                 onClick={dispatchRejectAction} // Call the function that dispatches the reject action
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//           {/* /Page Header */}

//           {/* PDF Viewer with adjustments */}
//           {pdfSrc && (
//             <div
//               style={{
//                 maxWidth: "100%",
//                 maxHeight: "50vh", // Limit the height to 50% of the viewport height
//               }}
//             >
//               <Worker
//                 workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
//               >
//                 <Viewer
//                   fileUrl={pdfSrc}
//                   defaultScale={1.0} // Set a default scale to make the PDF visible
//                   scale={1.0} // You can tweak this scale value for different zoom levels
//                 />
//               </Worker>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserApproveReject;

import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css"; // Required styles
import { pdfjs } from "react-pdf";
import { API_HOST } from "../../../base_URL/http";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Input, message, Button } from "antd";
import { ResetApproveState, UserApprove } from "../../../store/userapprove";
import { ResetRejectedState, UserReject } from "../../../store/userreject";

function UserApproveReject() {
  const [pdfSrc, setPdfSrc] = useState(""); // Store PDF file URL
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false); // Control Reject modal visibility
  const [remark, setRemark] = useState(""); // Store remark input
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.login.token); // Retrieve token from Redux store
  const approveResponse = useSelector((state) => state.userapprove.userapprove); // Get response from Approve action
  const rejectResponse = useSelector((state) => state.userreject.userreject); // Get response from Reject action

  useEffect(() => {
    const storedpdfFileId = localStorage.getItem("UserPdfFileId");
    if (storedpdfFileId) {
      const fullFileUrl = `${API_HOST}scan/serve_tiff_as_pdf/${storedpdfFileId}/`;
      setPdfSrc(fullFileUrl); // Set the PDF URL
    }
  }, []);

  const dispatchApproveAction = () => {
    const storedpdfFileId = localStorage.getItem("UserPdfFileId");
    if (storedpdfFileId) {
      dispatch(UserApprove(token, storedpdfFileId)); // Dispatch the Approve action
    }
  };

  const showRejectModal = () => {
    setIsRejectModalVisible(true); // Show the Reject modal
  };

  const handleRejectSubmit = () => {
    if (!remark.trim()) {
      message.error("Remark is required.", 3);
      return;
    }

    const storedpdfFileId = localStorage.getItem("UserPdfFileId");
    if (storedpdfFileId) {
      if (storedpdfFileId) {
        dispatch(UserReject(token, storedpdfFileId, { remark })); 
    }     
    }

    setIsRejectModalVisible(false); // Close the modal
    setRemark(""); // Reset the remark field
  };

  const handleRejectCancel = () => {
    setIsRejectModalVisible(false); // Close the modal
    setRemark(""); // Reset the remark field
  };

  useEffect(() => {
    if (approveResponse?.message) {
      message.success("File Approved.", 3);
      dispatch(ResetApproveState());
      history.push("/app/main/userqcchecked-files"); // Navigate to processed files
    }
  }, [approveResponse]);

  useEffect(() => {
    if (rejectResponse?.message) {
      message.success("File Rejected.", 3);
      dispatch(ResetRejectedState());
      history.push("/app/main/userqcchecked-files"); // Navigate to processed files
    }
  }, [rejectResponse]);

  useEffect(() => {
    dispatch(ResetApproveState());
    dispatch(ResetRejectedState());
  }, [dispatch]);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Files</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Tiff Files As Pdf</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-2">
              <button
                className="btn btn-success btn-block"
                onClick={dispatchApproveAction} // Call the function that dispatches the approve action
              >
                Approve
              </button>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-danger btn-block"
                onClick={showRejectModal} // Open the Reject modal
              >
                Reject
              </button>
            </div>
          </div>
          {/* /Page Header */}

          {/* PDF Viewer with adjustments */}
          {pdfSrc && (
            <div
              style={{
                maxWidth: "100%",
                maxHeight: "50vh", // Limit the height to 50% of the viewport height
              }}
            >
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
              >
                <Viewer
                  fileUrl={pdfSrc}
                  defaultScale={1.0} // Set a default scale to make the PDF visible
                  scale={1.0} // You can tweak this scale value for different zoom levels
                />
              </Worker>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      <Modal
        title="Provide Remark"
        visible={isRejectModalVisible}
        onCancel={handleRejectCancel}
        footer={[
          <Button key="cancel" onClick={handleRejectCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleRejectSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Input.TextArea
          placeholder="Enter your remark here..."
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          rows={4}
        />
      </Modal>
    </div>
  );
}

export default UserApproveReject;
