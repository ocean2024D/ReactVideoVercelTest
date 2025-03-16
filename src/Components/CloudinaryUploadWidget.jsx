import { useEffect } from "react";

const CloudinaryUploadWidget = () => {
  useEffect(() => {
    if (window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "YOUR_CLOUD_NAME", // Cloudinary Cloud Name
          uploadPreset: "YOUR_UPLOAD_PRESET", // Upload preset
        },
        (error, result) => {
          if (!error && result.event === "success") {
            console.log("File uploaded successfully: ", result.info.secure_url);
          } else {
            console.error("Error in file upload", error);
          }
        }
      );
      widget && widget.open();
    }
  }, []);

  return <div>Upload Widget</div>;
};

export default CloudinaryUploadWidget;
