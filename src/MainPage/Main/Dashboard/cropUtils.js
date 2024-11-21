export const getCroppedImg = (imageSrc, crop, zoom, rotation) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const image = new Image();
    image.src = imageSrc;
  
    return new Promise((resolve) => {
      image.onload = () => {
        const { width, height } = image;
        canvas.width = width;
        canvas.height = height;
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180); // Rotate the image
        ctx.drawImage(image, -width / 2, -height / 2);
  
        const croppedImage = ctx.getImageData(crop.x, crop.y, zoom * width, zoom * height);
  
        resolve(croppedImage);
      };
    });
  };
  