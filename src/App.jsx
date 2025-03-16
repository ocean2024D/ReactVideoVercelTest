import React, { useState } from "react";
import CloudinaryUploadWidget from "./Components/CloudinaryUploadWidget";
import VideoList from "./Components/VideoList";
const App = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <h1>Upload Video</h1>
      <CloudinaryUploadWidget setImageUrl={setImageUrl} />
      {imageUrl && <video src={imageUrl} controls width="400" />}
    
      <div>
      <h1>Test Videos</h1>
      <VideoList />
    </div>
    
    </div>
    
  );
};

export default App;
