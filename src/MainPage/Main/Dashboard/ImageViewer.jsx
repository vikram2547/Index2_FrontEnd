import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { useSelector } from "react-redux";
import { API_HOST } from "../../../base_URL/http";
import { message } from "antd";
import { useHistory } from "react-router-dom";

const ImageViewerWithCropper = ({ fileId, pageNumber, onPageChange }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [cropper, setCropper] = useState(null);
  const imageRef = useRef(null);
  const token = useSelector((state) => state.login.token);
  const [page_number, SetPagenumber] = useState(1);
  const history = useHistory();

 
  const fetchImage = async (page) => {
    try {
      const storedFileId = localStorage.getItem("selectedFileId");
      if (!storedFileId) {
        console.error("File ID is not found in local storage.");
        return;
      }

      setImageUrl(null);
      if (cropper) {
        cropper.destroy();
        setCropper(null);
      }

      const response = await axios.get(
        `${API_HOST}/scan/file-process/${storedFileId}/`,
        {
          params: { page },
          headers: { Authorization: `Token ${token}` },
          responseType: "blob",
        }
      );

      const newImageUrl = URL.createObjectURL(response.data);
      setImageUrl(newImageUrl);
    } catch (err) {
      console.error("Error fetching image:", err.response?.data || err.message);

      if (err.response?.data?.error) {
        const errorMessage = err.response.data.error;

        if (errorMessage.includes("Page number out of range")) {
          message.destroy();
          message.warning("This is the last page.", 3);
          history.push("/app/main/unprocessed-files");
        } else {
          message.destroy();
          message.error(errorMessage || "This is the last page.", 3);
          history.push("/app/main/unprocessed-files");
        }
      } else {
        message.destroy();
        message.error("This is the last page.", 3);
        history.push("/app/main/unprocessed-files");
      }
    }
  };

  const initializeCropper = () => {
    if (cropper) {
      cropper.destroy();
    }

    const imageElement = imageRef.current;
    if (imageElement) {
      const newCropper = new Cropper(imageElement, {
        aspectRatio: NaN,
        viewMode: 2,
        autoCropArea: 1,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
      });
      setCropper(newCropper);
    }
  };

  const rotateLeft = () => cropper?.rotate(-45);
  const rotateRight = () => cropper?.rotate(45);

  const handleNextPage = () => {
    SetPagenumber((prev) => prev + 1);
    fetchImage(page_number + 1);
  };

  const handleCropAndUpload = async () => {
    if (cropper) {
      const selectedFileName = localStorage.getItem("filename");
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImageUrl = croppedCanvas.toDataURL();
      const blob = await fetch(croppedImageUrl).then((res) => res.blob());
      const file = new File([blob], "cropped-image.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("cropped_image", file);
      formData.append("filename", selectedFileName);

      try {
        const response = await axios.post(
          `${API_HOST}/scan/upload-cropped-image/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    fetchImage(pageNumber);
  }, [fileId, pageNumber]);

  useEffect(() => {
    if (imageUrl) {
      initializeCropper();
    }

    // Clean up the previous cropper instance and image URL on unmount
    return () => {
      if (cropper) cropper.destroy();
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      setCropper(null);
    };
  }, [imageUrl]);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div
          style={{
            display: "flex",
            height: "80vh",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageUrl ? (
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Processed"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <div>Loading image...</div>
            )}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              background: "#f9f9f9",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            }}
          >
            <button
              onClick={handleCropAndUpload}
              style={{
                width: "200px",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Crop and Upload
            </button>
            <button
              onClick={rotateLeft}
              style={{
                width: "200px",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Rotate Left
            </button>
            <button
              onClick={rotateRight}
              style={{
                width: "200px",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#ffc107",
                color: "#000",
                border: "none",
                cursor: "pointer",
              }}
            >
              Rotate Right
            </button>
            <button
              onClick={handleNextPage}
              style={{
                width: "200px",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewerWithCropper;
