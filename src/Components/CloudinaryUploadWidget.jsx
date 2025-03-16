import React, { useEffect, useRef, useState } from "react";

const CloudinaryUploadWidget = ({ setImageUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    // Ensure cloudinary is loaded
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dbkdulf98", // Your Cloudinary cloud name
          uploadPreset: "my_preset", // Your upload preset
        },
        (error, result) => {
          if (!error && result.event === "success") {
            setImageUrl(result.info.secure_url); // Get the uploaded image URL
          }
        }
      );
    } else {
      console.error("Cloudinary script is not loaded.");
    }
  }, []);

  return (
    <button onClick={() => widgetRef.current.open()} className="p-2 bg-blue-500 text-white">
      Upload Image
    </button>
  );
};

export default CloudinaryUploadWidget;
