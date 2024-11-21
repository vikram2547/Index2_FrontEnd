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
import { Image } from "image-js";  
import { Link } from "react-router-dom";
import "antd/dist/antd.min.css";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Offcanvas from "../../../Entryfile/offcanvance";
import { getCroppedImg } from "./cropUtils"; // Your cropping logic

const Unprocessedfiles = () => {
  const [menu, setMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null); 
  const [crop, setCrop] = useState({ x: 0, y: 0 }); 
  const [rotation, setRotation] = useState(0); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const buffer = new Uint8Array(reader.result);
        const img = await Image.load(buffer); 
        setImage(img.toDataURL()); 
      };
      reader.readAsArrayBuffer(file);
      setIsModalVisible(true); 
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
      const croppedBlob = await getCroppedImg(image, crop, zoom, rotation);
      console.log("Cropped Image Blob:", croppedBlob);
      alert("Image cropped successfully!");
    } catch (err) {
      console.error("Error cropping image:", err);
    }
  };

  const handleSave = () => {
    const apiData = { file: selectedFile };
    console.log("Save file", apiData);
    alert("File saved successfully!");
    setIsModalVisible(false); // Close the modal
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
        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
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
        {image && (
          <div className="file-viewer">
            <img src={image} alt="cropped" style={{ transform: `rotate(${rotation}deg)` }} />
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
          </div>
        )}
      </Modal>

      <Offcanvas />
    </>
  );
};

export default Unprocessedfiles;
