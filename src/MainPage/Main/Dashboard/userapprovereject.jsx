import React, { useState, useEffect } from "react";
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
    const storedPdfFileId = localStorage.getItem("UserPdfFileId");
    if (storedPdfFileId) {
      const fullFileUrl = `${API_HOST}scan/serve_tiff_as_pdf/${storedPdfFileId}/`;
      setPdfSrc(fullFileUrl); // Set the PDF URL
    }
  }, []);

  const dispatchApproveAction = () => {
    const storedPdfFileId = localStorage.getItem("UserPdfFileId");
    if (storedPdfFileId) {
      dispatch(UserApprove(token, storedPdfFileId)); // Dispatch the Approve action
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

    const storedPdfFileId = localStorage.getItem("UserPdfFileId");
    if (storedPdfFileId) {
      dispatch(UserReject(token, storedPdfFileId, { remark }));
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
                  <li className="breadcrumb-item active">Tiff Files As PDF</li>
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

          {/* PDF Viewer */}
          {pdfSrc ? (
            <div
              style={{
                width: "100%",
                height: "80vh", // Adjust viewer height
                border: "1px solid #ddd",
              }}
            >
              <iframe
                src={pdfSrc}
                title="PDF Viewer"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              ></iframe>
            </div>
          ) : (
            <p>No PDF file available</p>
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
