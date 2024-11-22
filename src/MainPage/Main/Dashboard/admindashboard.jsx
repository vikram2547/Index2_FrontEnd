// import React, { useState } from "react";
// import { withRouter } from "react-router-dom";
// import Sidebar from "../../../initialpage/Sidebar/sidebar";
// import Offcanvas from "../../../Entryfile/offcanvance/index.jsx";
// import "../../index.css";
// import DWT from "../../../DynamsoftSDK";

// const AdminDashboard = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [fileName, setFileName] = useState("No file name available");
//   const [docType, setDocType] = useState("");
//   const [formData, setFormData] = useState({
//     officeCode: "",
//     volumeNo: "",
//     year: "",
//     bookNo: "",
//     runningNo: "",
//   });

//   const documentTypes = [
//     "Index File",
//     "Municipal Town Property Register",
//     "Register Of Holdings",
//     "Regular Document Register",
//     "Loan Order Register",
//     "Memo Order Register",
//     "Court Order Register",
//   ];

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("File name generated successfully!");
//   };

//   const handleScanClick = () => {
//     setShowScanner(true);
//     setShowForm(false); // Ensure the form is hidden
//   };

//   const handleFormClick = () => {
//     setShowForm(true);
//     setShowScanner(false); // Ensure the scanner is hidden
//   };

//   return (
//     <>
//       <div>
//         <Sidebar />
//         <div className="page-wrapper">
//           <div className="content container-fluid">
//             <div className="page-header">
//               <div className="row">
//                 <div className="col-sm-12">
//                   <h3 className="page-title">Welcome</h3>
//                   <ul className="breadcrumb">
//                     <li className="breadcrumb-item active">Dashboard</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             {/* File Input Section */}
//             <div className="row align-items-center mb-4">
//               <div className="col-md-2">
//                 <button
//                   className="btn btn-primary btn-block"
//                   onClick={handleScanClick} // Trigger scanner
//                 >
//                   Scan Document
//                 </button>
//               </div>
//               <div className="col-md-6">
//                 <input
//                   type="text"
//                   className="form-control"
//                   readOnly
//                   value={fileName}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <button
//                   className="btn btn-success btn-block"
//                   onClick={handleFormClick} // Trigger form
//                 >
//                   Add/Change File Name
//                 </button>
//               </div>
//             </div>

//             {/* Scanner Section */}
//             {showScanner && (
//               <div className="scanner-container">
//                 <DWT
//                   features={[
//                     "scan",
//                     "camera",
//                     "load",
//                     "save",
//                     "upload",
//                     "barcode",
//                     "uploader",
//                   ]}
//                 />
//               </div>
//             )}

//             {/* Form Section */}
//             {showForm && (
//               <div className="card">
//                 <div className="card-header">
//                   <h4>Create File Name</h4>
//                 </div>
//                 <div className="card-body">
//                   <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                       <label>Document Type</label>
//                       <select
//                         className="form-control"
//                         value={docType}
//                         onChange={(e) => setDocType(e.target.value)}
//                       >
//                         <option value="">Select Document Type</option>
//                         {documentTypes.map((type) => (
//                           <option key={type} value={type}>
//                             {type}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

// {/* Common Fields */}
// {(docType === "Index File" ||
//   docType === "Municipal Town Property Register" ||
//   docType === "Register Of Holdings" ||
//   docType === "Regular Document Register" ||
//   docType === "Loan Order Register" ||
//   docType === "Memo Order Register" ||
//   docType === "Court Order Register") && (
//   <>
//     <div className="form-group">
//       <label>Office Code</label>
//       <input
//         type="text"
//         className="form-control"
//         name="officeCode"
//         value={formData.officeCode}
//         onChange={handleInputChange}
//       />
//     </div>
//     <div className="form-group">
//       <label>Volume No</label>
//       <input
//         type="text"
//         className="form-control"
//         name="volumeNo"
//         value={formData.volumeNo}
//         onChange={handleInputChange}
//       />
//     </div>
//     <div className="form-group">
//       <label>Year</label>
//       <input
//         type="text"
//         className="form-control"
//         name="year"
//         value={formData.year}
//         onChange={handleInputChange}
//       />
//     </div>
//   </>
// )}
//                     {/* Additional Fields for Specific Types */}
//                     {(docType === "Regular Document Register" ||
//                       docType === "Loan Order Register" ||
//                       docType === "Memo Order Register" ||
//                       docType === "Court Order Register") && (
//                       <>
//                         <div className="form-group">
//                           <label>Book No</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="bookNo"
//                             value={formData.bookNo}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Running No</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="runningNo"
//                             value={formData.runningNo}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </>
//                     )}

//                     <button type="submit" className="btn btn-primary mt-3">
//                       Generate File Name
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Offcanvas />
//     </>
//   );
// };

// export default withRouter(AdminDashboard);
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Offcanvas from "../../../Entryfile/offcanvance/index.jsx";
import "../../index.css";
import DWT from "../../../DynamsoftSDK";
import { addfilename } from "../../../store/addfilename.js";
import { useDispatch } from "react-redux";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [fileName, setFileName] = useState("No file name available");
  const [docType, setDocType] = useState("");
  const [formData, setFormData] = useState({
    officeCode: "",
    volumeNo: "",
    year: "",
    bookNo: "",
    runningNo: "",
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompareInputChange = (e) => {
    setCompareData({ ...compareData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    setShowComparison(true);
    setShowForm(false);
    alert("File name generated and data saved successfully!");
  };

  const handleSave = () => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    const isMatching = Object.keys(storedData).every(
      (key) => storedData[key] === compareData[key]
    );

    if (isMatching) {
      dispatch(addfilename(data));
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
                            name="officeCode"
                            value={formData.officeCode}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Volume No</label>
                          <input
                            type="text"
                            className="form-control"
                            name="volumeNo"
                            value={formData.volumeNo}
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
                                name="bookNo"
                                value={formData.bookNo}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group">
                              <label>Running No</label>
                              <input
                                type="text"
                                className="form-control"
                                name="runningNo"
                                value={formData.runningNo}
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
                          (key === "bookNo" || key === "runningNo") &&
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
                          (key === "bookNo" || key === "runningNo") &&
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
