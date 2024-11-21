// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Table } from "antd";
// import "antd/dist/antd.min.css";
// import { itemRender, onShowSizeChange } from "../../paginationfunction";
// import Header from "../../../initialpage/Sidebar/header";
// import Sidebar from "../../../initialpage/Sidebar/sidebar";
// import Offcanvas from "../../../Entryfile/offcanvance";

// const Unprocessedfiles = () => {
//   const [menu, setMenu] = useState(false);

//   const toggleMobileMenu = () => {
//     setMenu(!menu);
//   };
//   const data = [
//     {
//       id: 1,
//       name: "file_1",
//     },
//     {
//       id: 2,
//       name: "file_2",
//     },
   
//   ];

//   useEffect(() => {
//     if ($(".select").length > 0) {
//       $(".select").select2({
//         minimumResultsForSearch: -1,
//         width: "100%",
//       });
//     }
//   });

//   const columns = [
//     {
//       title: "File Name",
//       dataIndex: "name",
//       sorter: (a, b) => a.name.length - b.name.length,
//     },

//     // {
//     //   title: "Mobile",
//     //   dataIndex: "mobile",
//     //   sorter: (a, b) => a.mobile.length - b.mobile.length,
//     // },
//     {
//       title: "Action",
//       render: (record) => (
//         <div className="action-icons text-end">
//           <Link
//             to="#"
//             onClick={() => handleView(record)}
//             className="action-icon"
//           >
//             <i className="fa fa-eye m-r-5" /> {/* View Icon */}
//           </Link>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <>
//       <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
//         <Header onMenuClick={() => toggleMobileMenu()} />
//         <Sidebar />
//         <div className="page-wrapper">
//           {/* Page Content */}
//           <div className="content container-fluid">
//             {/* Page Header */}
//             <div className="page-header">
//               <div className="row align-items-center">
//                 <div className="col">
//                   <h3 className="page-title">Files</h3>
//                   <ul className="breadcrumb">
//                     <li className="breadcrumb-item">
//                       <Link to="/app/main/dashboard">Dashboard</Link>
//                     </li>
//                     <li className="breadcrumb-item active">
//                       Unprocessed Files
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             {/* /Page Header */}

//             <div className="row">
//               <div className="col-md-12">
//                 <div className="table-responsive">
//                   <Table
//                     className="table-striped"
//                     pagination={{
//                       total: data.length,
//                       showTotal: (total, range) =>
//                         `Showing ${range[0]} to ${range[1]} of ${total} entries`,
//                       showSizeChanger: true,
//                       onShowSizeChange: onShowSizeChange,
//                       itemRender: itemRender,
//                     }}
//                     style={{ overflowX: "auto" }}
//                     columns={columns}
//                     bordered
//                     dataSource={data}
//                   />
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

// export default Unprocessedfiles;
import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import Cropper from "react-easy-crop"; // Importing cropper component
import { getCroppedImg } from "./cropUtils"; // Import the getCroppedImg function

const Unprocessedfiles = () => {
  const [menu, setMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null); // State to hold the image data
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImage(reader.result); // Set the image data
        setIsModalVisible(true); // Show the modal once the image is loaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotateLeft = () => {
    setRotation(rotation - 90); // Rotate left
  };

  const handleRotateRight = () => {
    setRotation(rotation + 90); // Rotate right
  };

  const handleCrop = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(image, crop, zoom, rotation);
      setCroppedImage(croppedImageUrl); // Show the cropped image preview
    } catch (err) {
      console.error("Error cropping image:", err);
    }
  };

  const handleSave = () => {
    const apiData = { file: selectedFile, croppedImage };
    console.log("Save file", apiData);
    alert("File saved successfully!");
    setIsModalVisible(false);
  };

  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Richard Miles" },
  ];

  const columns = [
    {
      title: "File Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      render: (record) => (
        <div className="action-icons text-end">
          <label className="action-icon" style={{ cursor: "pointer" }}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <i className="fa fa-upload m-r-5" /> {/* Choose File Icon */}
            Choose File
          </label>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        {/* Header and Sidebar */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Files</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Unprocessed Files</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: data.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    bordered
                    dataSource={data}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for File Viewer */}
      <Modal
        title="File Viewer"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {image ? (
          <div className="file-viewer">
            <div
              className="crop-container"
              style={{
                position: "relative",
                width: "100%",
                height: "400px",
                maxHeight: "500px", // Ensures the container doesn't become too small
              }}
            >
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                aspect={1} // Set aspect ratio if needed
                style={{
                  width: "100%", // Ensure cropper takes full width
                  height: "100%", // Ensure cropper takes full height
                }}
              />
            </div>
            <div className="actions mt-3 text-center">
              <Button onClick={handleRotateLeft}>Rotate Left</Button>
              <Button onClick={handleRotateRight} className="mx-2">
                Rotate Right
              </Button>
              <Button onClick={handleCrop}>Crop</Button>
              <Button type="primary" onClick={handleSave} className="ml-2">
                Save
              </Button>
            </div>
            {croppedImage && (
              <div>
                <h4>Cropped Image Preview</h4>
                <img src={croppedImage} alt="Cropped" style={{ width: "100%", maxHeight: "400px" }} />
              </div>
            )}
          </div>
        ) : (
          <div>Loading image...</div>
        )}
      </Modal>
    </>
  );
};

export default Unprocessedfiles;
