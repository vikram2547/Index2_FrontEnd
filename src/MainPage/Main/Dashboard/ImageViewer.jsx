import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { useSelector } from "react-redux";
import { API_HOST } from "../../../base_URL/http";

const ImageViewerWithCropper = ({ fileId, pageNumber, onPageChange }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [croppedImages, setCroppedImages] = useState([]);
  const imageRef = useRef(null);
  const token = useSelector((state) => state.login.token);
  const [page_number, SetPagenumber] = useState(1);

  const fetchImage = async (page) => {
    try {
      const storedFileId = localStorage.getItem("selectedFileId");
      if (!storedFileId) {
        console.error("File ID is not found in local storage.");
        return;
      }
  
      const response = await axios.get(
        `${API_HOST}/scan/file-process/${storedFileId}/`,
        {
          params: { page },
          headers: { Authorization: `Token ${token}` },
          responseType: "blob",
        }
      );
  
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);
  
      // Assuming the response contains the total number of pages
      const totalPages = response.data.totalPages; // Adjust based on your API response structure
      setTotalPages(totalPages);
  
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        const errorMessage = err.response.data.error;
        console.error("Error fetching image:", errorMessage);
  
        if (errorMessage.includes("Page number out of range")) {
          alert(errorMessage);
        }
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };
  

  const initializeCropper = () => {
    // Ensure any existing cropper is destroyed before initializing a new one
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
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedImageUrl = croppedCanvas.toDataURL();
        setCroppedImages((prev) => [...prev, croppedImageUrl]);
      } else {
        console.error("Cropped canvas could not be generated.");
      }
        const totalPages = 10; 
  
      if (page_number >= totalPages) {
        alert("This is the last page.");
      } else {
        onPageChange?.(page_number + 1);
        SetPagenumber(page_number + 1);
        fetchImage(page_number + 1);
      }
    } else {
      console.error("Cropper is not initialized.");
    }
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
    return () => cropper?.destroy();
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
