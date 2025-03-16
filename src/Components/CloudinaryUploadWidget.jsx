

import React, { useEffect } from "react";

const CloudinaryUploadWidget = ({ setVideoUrl }) => {
  useEffect(() => {
    const cloudinaryWidget = window.cloudinary.createUploadWidget(
      {
           cloudName: "dbkdulf98", // Cloudinary'deki cloud isminiz
        uploadPreset: "my_preset",  // Cloudinary upload preset'inizi buraya ekleyin
        sources: ["local", "url", "camera"],
        resourceType: "video",
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
        theme: "minimal",
      },
      (error, result) => {
        if (result.event === "success") {
          setVideoUrl(result.info.secure_url); // Yüklenen video URL'sini alıp parent komponent'e ilet
        }
      }
    );

    return () => {
      cloudinaryWidget.close(); // Temizleme işlemi
    };
  }, [setVideoUrl]);

  return (
    <div className="absolute top-4 left-4">
      <button
        onClick={() => window.cloudinary.openUploadWidget()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Video Yükle
      </button>
    </div>
  );
};

export default CloudinaryUploadWidget;
