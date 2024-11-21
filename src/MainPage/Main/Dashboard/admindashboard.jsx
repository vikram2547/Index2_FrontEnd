// import React, { useState, useRef, useEffect } from "react";
// import { withRouter } from "react-router-dom";
// import Sidebar from "../../../initialpage/Sidebar/sidebar";
// import Offcanvas from "../../../Entryfile/offcanvance/index.jsx";
// import "../../index.css";
// import { useHistory } from "react-router-dom";

// const AdminDashboard = () => {
//   const dwtRef = useRef(null); 
//   const history = useHistory();
//   const [fileName, setFileName] = useState("No file name available");
//   const [showForm, setShowForm] = useState(false);
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
//     history.push("/app/main/scanner");
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
//                   onClick={handleScanClick} // Trigger scan
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
//                   onClick={() => setShowForm(!showForm)}
//                 >
//                   Add/Change File Name
//                 </button>
//               </div>
//             </div>
//             <div id="dwtcontrolContainer" style={{ display: "none" }}></div>{" "}
//             {/* DWT container */}
//             {/* Conditional Form */}
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

//                     {/* Common Fields */}
//                     {(docType === "Index File" ||
//                       docType === "Municipal Town Property Register" ||
//                       docType === "Register Of Holdings" ||
//                       docType === "Regular Document Register" ||
//                       docType === "Loan Order Register" ||
//                       docType === "Memo Order Register" ||
//                       docType === "Court Order Register") && (
//                       <>
//                         <div className="form-group">
//                           <label>Office Code</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="officeCode"
//                             value={formData.officeCode}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Volume No</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="volumeNo"
//                             value={formData.volumeNo}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Year</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="year"
//                             value={formData.year}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </>
//                     )}
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

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [fileName, setFileName] = useState("No file name available");
  const [docType, setDocType] = useState("");
  const [formData, setFormData] = useState({
    officeCode: "",
    volumeNo: "",
    year: "",
    bookNo: "",
    runningNo: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("File name generated successfully!");
  };

  const handleScanClick = () => {
    setShowScanner(true);
    setShowForm(false); // Ensure the form is hidden
  };

  const handleFormClick = () => {
    setShowForm(true);
    setShowScanner(false); // Ensure the scanner is hidden
  };

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
                  onClick={handleScanClick} // Trigger scanner
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
                  onClick={handleFormClick} // Trigger form
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
                    {(docType === "Index File" ||
                      docType === "Municipal Town Property Register" ||
                      docType === "Register Of Holdings" ||
                      docType === "Regular Document Register" ||
                      docType === "Loan Order Register" ||
                      docType === "Memo Order Register" ||
                      docType === "Court Order Register") && (
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
                      </>
                    )}
                    {/* Additional Fields for Specific Types */}
                    {(docType === "Regular Document Register" ||
                      docType === "Loan Order Register" ||
                      docType === "Memo Order Register" ||
                      docType === "Court Order Register") && (
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

                    <button type="submit" className="btn btn-primary mt-3">
                      Generate File Name
                    </button>
                  </form>
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
