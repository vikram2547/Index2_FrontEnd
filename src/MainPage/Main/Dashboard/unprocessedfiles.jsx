import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropUtils";
import { getUnprocessedFiles } from "../../../store/getunprocesedfiles";
import { useDispatch, useSelector } from "react-redux";
import { getFile } from "../../../store/getfile";
import { addCroppedImage } from "../../../store/addcropimage";

const Unprocessedfiles = () => {
  const [menu, setMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [croppedImage, setCroppedImage] = useState([]);
  const [cropper, setCropper] = useState(null);

  

  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const data =
    useSelector((state) => state.getunprocessedfiles.getunprocessedfiles) || [];
    
    const file = useSelector((state) => state.getfile.getfile);
    console.log(file, "file");
    

  // Rotate image left
  const handleRotateLeft = () => {
    setRotation(rotation - 90);
  };

  // Rotate image right
  const handleRotateRight = () => {
    setRotation(rotation + 90);
  };

  // Handle cropping image
  const handleCrop = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(image, crop, zoom, rotation);
      setCroppedImage(croppedImageUrl);
    } catch (err) {
      console.error("Error cropping image:", err);
    }
  };


  
  const handleNextPage = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImageUrl = croppedCanvas.toDataURL(); 

      setCroppedImage(prevImages => [...prevImages, croppedImageUrl]);

      if (onPageChange) {
        onPageChange(pageNumber + 1);
      }
    }
  };

  // Save the cropped image
  const handleSave = () => {
    const apiData = { file: selectedFile, croppedImage };
    console.log("Save file", apiData);
    dispatch(addCroppedImage(token, apiData));
    alert("File saved successfully!");
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "File Name",
      dataIndex: "filename",
      sorter: (a, b) => a.filename.length - b.filename.length,
    },
    {
      title: "Action",
      render: (_, record) => (
        <i
          className="fa fa-eye action-icon"
          style={{ cursor: "pointer", color: "#1890ff" }}
          onClick={() => handleEyeIconClick(record.id)} // Dispatch action with record ID
        />
      ),
    },
  ];

  const handleEyeIconClick = (fileId) => {
    if (token) {
      dispatch(getFile(token, fileId)); // Dispatch action with token and fileId
    }
  };
  // Fetch unprocessed files when component mounts or token changes
  useEffect(() => {
    if (token) {
      dispatch(getUnprocessedFiles(token));
    }
  }, [dispatch, token]);

  
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
                    <li className="breadcrumb-item active">
                      Unprocessed Files
                    </li>
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
                    dataSource={Array.isArray(data) ? data : []}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for File Viewer */}
      <Modal
        visible={isModalVisible}
        title="Crop Image"
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div style={{ position: "relative", width: "100%", height: 400 }}>
          {/* Render Cropper component */}
          {file && (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          )}
        </div>

        {/* Control Buttons */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Button onClick={handleRotateLeft} style={{ marginRight: 10 }}>
            Rotate Left
          </Button>
          <Button onClick={handleRotateRight} style={{ marginRight: 10 }}>
            Rotate Right
          </Button>
          <Button onClick={handleCrop} style={{ marginRight: 10 }}>
            Crop
          </Button>
          <Button type="primary" onClick={handleSave}>
            Save Cropped Image
          </Button>
          <Button type="primary" onClick={handleNextPage}>
            Next Page
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Unprocessedfiles;
