import React from "react";

const VideoList = () => {
  const videos = [
    {
      id: 1,
      url: "/videos/v1.mp4", // public/videos/video1.mp4
      title: "Video 1",
    },
    {
      id: 2,
      url: "/videos/v2.mp4", // public/videos/video2.mp4
      title: "Video 2",
    },
  ];

  return (
    <div>
      <h2>Test Videos</h2>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <h3>{video.title}</h3>
            <video width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
