// export const getCroppedImg = (imageSrc, crop, zoom, rotation) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
  
//     const image = new Image();
//     image.src = imageSrc;
  
//     return new Promise((resolve) => {
//       image.onload = () => {
//         const { width, height } = image;
//         canvas.width = width;
//         canvas.height = height;
  
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.save();
//         ctx.translate(canvas.width / 2, canvas.height / 2);
//         ctx.rotate((rotation * Math.PI) / 180); // Rotate the image
//         ctx.drawImage(image, -width / 2, -height / 2);
  
//         const croppedImage = ctx.getImageData(crop.x, crop.y, zoom * width, zoom * height);
  
//         resolve(croppedImage);
//       };
//     });
//   };
export const getCroppedImg = (imageSrc, crop, zoom, rotation) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const image = new Image();
    image.src = imageSrc;
  
    return new Promise((resolve) => {
      image.onload = () => {
        // Calculate the aspect ratio based on the crop area and zoom
        const width = image.width * zoom;
        const height = image.height * zoom;
  
        // Set canvas width and height to match the image
        canvas.width = width;
        canvas.height = height;
  
        // Apply rotation and zoom
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(image, -width / 2, -height / 2, width, height);
  
        // Crop based on the selected area
        const cropWidth = crop.width * zoom;
        const cropHeight = crop.height * zoom;
        const croppedImage = ctx.getImageData(crop.x * zoom, crop.y * zoom, cropWidth, cropHeight);
  
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.putImageData(croppedImage, 0, 0);
  
        // Convert canvas to image
        canvas.toDataURL("image/jpeg", 1.0, (dataUrl) => {
          resolve(dataUrl); // Return the base64 encoded image data
        });
      };
    });
  };
  