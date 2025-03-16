import React, { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

const CloudinaryUploadWidget = ({ setImageUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbkdulf98", // Cloudinary'deki cloud isminiz
        uploadPreset: "my_preset", // Upload Preset'iniz
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImageUrl(result.info.secure_url); // Yüklenen görüntü URL'sini al
        }
      }
    );
  }, []);

  return (
    <button onClick={() => widgetRef.current.open()} className="p-2 bg-blue-500 text-white">
      Upload Image
    </button>
  );
};

export default CloudinaryUploadWidget;
