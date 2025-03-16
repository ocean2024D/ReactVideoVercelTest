import React, { useState } from "react";
import CloudinaryUploadWidget from "./Components/CloudinaryUploadWidget"
import VideoList from "./Components/VideoList";


const App = () => {
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <div>
      <CloudinaryUploadWidget setVideoUrl={setVideoUrl} />
      {videoUrl && (
        <div>
          <h3>Yüklenen Video:</h3>
          <video width="320" height="240" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <VideoList />
    </div>
  );
};

export default App;
