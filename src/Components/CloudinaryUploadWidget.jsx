const CloudinaryUploadWidget = ({ setVideoUrl }) => {
  const handleUpload = () => {
    // Cloudinary widget'ını başlatıyoruz
    window.cloudinary.openUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME, // Cloudinary hesabınızın adı
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET, // Cloudinary üzerinde oluşturduğunuz upload preset
        sources: ['local', 'url', 'camera'],
        resourceType: "video", // Video yüklemesi yapmak için
        multiple: false, // Birden fazla yükleme istemiyorsak false
        clientAllowedFormats: ["mp4", "mov", "avi", "flv", "mkv"], // Yüklenebilir video formatları
      },
      (error, result) => {
        if (result && result.event === "success") {
          const videoUrl = result.info.secure_url; // Yüklenen video URL'si
          setVideoUrl(videoUrl); // URL'yi üst bileşene gönder
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
