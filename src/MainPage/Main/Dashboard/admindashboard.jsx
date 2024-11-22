import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Offcanvas from "../../../Entryfile/offcanvance/index.jsx";
import "../../index.css";
import DWT from "../../../DynamsoftSDK";
import { useDispatch, useSelector } from "react-redux";
import { addFileName } from "../../../store/addfilename";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [fileName, setFileName] = useState("No file name available");
  const [docType, setDocType] = useState("");
  const [formData, setFormData] = useState({
    office_code: "",
    volume_no: "",
    year: "",
    book_no: "",
    running_no: "",
  });
  const [compareData, setCompareData] = useState({});

  const documentTypes = [
    "Index File",
    "Municipal Town Property Register",
    "Register Of Holdings",
    "Regular Document Register",
    "Loan Order Register",
    "Memo Order Register",
    "Court Order Register",
  ];

  const token = useSelector((state) => state.login.token);
  const officeCode = useSelector((state) => state.login.office_code);
  const FileNameSelector = useSelector((state) => state.addfilename.filename);
  useEffect(() => {
    // Check if fileName is already stored in localStorage
    const storedFileName = localStorage.getItem("fileName");
    if (storedFileName) {
      setFileName(storedFileName);
    } else if (FileNameSelector) {
      setFileName(FileNameSelector);
      localStorage.setItem("fileName", FileNameSelector); // Save to localStorage
    }
  }, [FileNameSelector]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompareInputChange = (e) => {
    setCompareData({ ...compareData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataWithOfficeCode = { ...formData, office_code: officeCode };
    localStorage.setItem("formData", JSON.stringify(dataWithOfficeCode));
    setShowComparison(true);
    setShowForm(false);
    alert("File name generated and data saved successfully!");
  };

  const handleSave = () => {
    const storedData = JSON.parse(localStorage.getItem("formData"));

    const documentTypeMapping = {
      "Index File": {
        document_type: "Index",
        requiredFields: ["office_code", "year", "volume_no", "part"],
      },
      "Municipal Town Property Register": {
        document_type: "MTPR",
        requiredFields: ["office_code", "year", "volume_no", "part"],
      },
      "Register Of Holdings": {
        document_type: "ROH",
        requiredFields: ["office_code", "year", "volume_no", "part"],
      },
      "Regular Document Register": {
        document_type: "R",
        requiredFields: ["office_code", "book_no", "running_no", "year"],
      },
      "Loan Order Register": {
        document_type: "LO",
        requiredFields: ["office_code", "book_no", "running_no", "year"],
      },
      "Memo Order Register": {
        document_type: "MO",
        requiredFields: ["office_code", "book_no", "running_no", "year"],
      },
      "Court Order Register": {
        document_type: "CO",
        requiredFields: ["office_code", "book_no", "running_no", "year"],
      },
    };

    const mapping = documentTypeMapping[docType];

    if (!mapping) {
      alert("Error: Invalid document type!");
      return;
    }

    const { document_type, requiredFields } = mapping;

    // Construct payload with relevant fields only
    const payload = requiredFields.reduce((acc, field) => {
      acc[field] =
        field === "office_code" ? officeCode : formData[field]?.trim();
      return acc;
    }, {});

    payload["document_type"] = document_type;

    const isMatching = Object.keys(payload).every(
      (key) =>
        (storedData[key]?.trim?.() || "") === (formData[key]?.trim?.() || "")
    );

    if (isMatching) {
      dispatch(addFileName(token, payload));
      alert("Data matches successfully!");
    } else {
      alert("Error: Data does not match!");
    }
  };

  const handleScanClick = () => {
    setShowScanner(true);
    setShowForm(false);
    setShowComparison(false);
  };

  const handleFormClick = () => {
    setShowForm(true);
    setShowScanner(false);
    setShowComparison(false);
  };

  // Function to check if document type is one of the excluded types
  const isExcludedDocumentType = () =>
    [
      "Index File",
      "Municipal Town Property Register",
      "Register Of Holdings",
    ].includes(docType);

  return (
    <>
      <div>
        <Sidebar />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Welcome</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* File Input Section */}
            {!FileNameSelector ? (
              <>
                {/* File Input Section */}
                <div className="row align-items-center mb-4">
                  <div className="col-md-2">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={handleScanClick}
                    >
                      Scan Document
                    </button>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={fileName}
                    />
                  </div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-success btn-block"
                      onClick={handleFormClick}
                    >
                      Add/Change File Name
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="row align-items-center mb-4">
                <div className="col-md-2">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleScanClick}
                  >
                    Scan Document
                  </button>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={fileName}
                  />
                </div>
                <div className="col-md-4">
                  <button
                    className="btn btn-success btn-block"
                    onClick={handleFormClick}
                  >
                    Add/Change File Name
                  </button>
                </div>
              </div>
            )}

            {/* Scanner Section */}
            {showScanner && (
              <div className="scanner-container">
                <DWT
                  features={[
                    "scan",
                    "camera",
                    "load",
                    "save",
                    "upload",
                    "barcode",
                    "uploader",
                  ]}
                />
              </div>
            )}

            {/* Form Section */}
            {showForm && (
              <div className="card">
                <div className="card-header">
                  <h4>Create File Name</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Document Type</label>
                      <select
                        className="form-control"
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                      >
                        <option value="">Select Document Type</option>
                        {documentTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Common Fields */}
                    {docType && (
                      <>
                        <div className="form-group">
                          <label>Office Code</label>
                          <input
                            type="text"
                            className="form-control"
                            value={officeCode}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Volume No</label>
                          <input
                            type="text"
                            className="form-control"
                            name="volume_no"
                            value={formData.volume_no}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Year</label>
                          <input
                            type="text"
                            className="form-control"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Conditionally render Book No and Running No */}
                        {!isExcludedDocumentType() && (
                          <>
                            <div className="form-group">
                              <label>Book No</label>
                              <input
                                type="text"
                                className="form-control"
                                name="book_no"
                                value={formData.book_no}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group">
                              <label>Running No</label>
                              <input
                                type="text"
                                className="form-control"
                                name="running_no"
                                value={formData.running_no}
                                onChange={handleInputChange}
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}

                    <button type="submit" className="btn btn-primary mt-3">
                      Generate File Name
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Comparison Section */}
            {showComparison && (
              <div className="row">
                {/* Left Form (Masked) */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h4>Original Data (Masked)</h4>
                    </div>
                    <div className="card-body">
                      {Object.entries(formData).map(([key, value]) => {
                        // Conditionally hide Book No and Running No
                        if (
                          (key === "book_no" || key === "running_no") &&
                          isExcludedDocumentType()
                        ) {
                          return null;
                        }
                        return (
                          <div className="form-group" key={key}>
                            <label>{key}</label>
                            <input
                              type="text"
                              className="form-control"
                              value={"*".repeat(value.length)}
                              readOnly
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Form (Editable) */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h4>Re-Enter Data</h4>
                    </div>
                    <div className="card-body">
                      {Object.keys(formData).map((key) => {
                        // Conditionally hide Book No and Running No
                        if (
                          (key === "book_no" || key === "running_no") &&
                          isExcludedDocumentType()
                        ) {
                          return null;
                        }

                        // If the key is office_code, display it as read-only
                        if (key === "office_code") {
                          return (
                            <div className="form-group" key={key}>
                              <label>{key}</label>
                              <input
                                type="text"
                                className="form-control"
                                value={officeCode} // use officeCode from Redux
                                readOnly
                              />
                            </div>
                          );
                        }

                        return (
                          <div className="form-group" key={key}>
                            <label>{key}</label>
                            <input
                              type="text"
                              className="form-control"
                              name={key}
                              value={compareData[key] || ""}
                              onChange={handleCompareInputChange}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="col-md-12 text-center mt-3">
                  <button className="btn btn-success mr-3" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Offcanvas />
    </>
  );
};

export default withRouter(AdminDashboard);
