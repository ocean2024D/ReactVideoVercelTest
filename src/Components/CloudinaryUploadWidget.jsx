import React, { useState } from "react";

const CloudinaryUploadWidget = ({ setVideoUrl }) => {
  const handleUpload = () => {
    // Cloudinary widget'ını başlatıyoruz
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dbkdulf98", 
        uploadPreset: "my_preset", 
        sources: ['local', 'url', 'camera'],
        resourceType: "video", 
        multiple: false, 
        clientAllowedFormats: ["mp4", "mov", "avi", "flv", "mkv"], 
      },
      (error, result) => {
        if (result && result.event === "success") {
          const videoUrl = result.info.secure_url; 
          setVideoUrl(videoUrl); 
        }
      }
    );
  };

  return (
    <div>
      <button onClick={handleUpload}>Video Yükle</button>
    </div>
  );
};

export default CloudinaryUploadWidget;
