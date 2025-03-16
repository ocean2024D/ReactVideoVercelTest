import React, { useState, useRef, useEffect } from "react";
import v1 from "./assets/v1.mp4";
import v2 from "./assets/v2.mp4";
import v3 from "./assets/v3.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faUser,
  faHeart,
  faCommentDots,
  faShare,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const videos = [v1, v2, v3];

function App() {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);
  const [loadedVideos, setLoadedVideos] = useState([]);
  const [loading, setLoading] = useState(videos.map(() => true));

  const updateProgress = (index) => {
    if (videoRefs.current[index]) {
      const currentProgress =
        (videoRefs.current[index].currentTime / videoRefs.current[index].duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressChange = (e, index) => {
    if (videoRefs.current[index]) {
      const newTime = (e.target.value / 100) * videoRefs.current[index].duration;
      videoRefs.current[index].currentTime = newTime;
    }
  };

  const handlePlayPause = (index) => {
    if (videoRefs.current[index]) {
      if (isPlaying) {
        videoRefs.current[index].pause();
      } else {
        videoRefs.current[index].play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoIndex = entry.target.dataset.index;
          const video = videoRefs.current[videoIndex];
          
          if (entry.isIntersecting) {
            // When video comes into view, load it and play it
            setLoadedVideos((prev) => [...new Set([...prev, videoIndex])]);
            video.muted = false;
            video.play();  // Play the video when it is in view
          } else {
            // When video goes out of view, mute it and pause
            video.muted = true;
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video, index) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, []);

  return (
    <div className="h-screen w-full bg-black flex flex-col relative">
      <div className="flex-grow overflow-y-auto snap-mandatory snap-y">
        {videos.map((video, index) => (
          <div key={index} className="relative w-full h-screen snap-start flex justify-center items-center">
            {/* Loading Spinner */}
            {loading[index] && (
              <div className="absolute flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faSpinner} size="3x" className="animate-spin" />
              </div>
            )}

            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-screen object-cover my-2"
              loop
              preload="auto" // Load video as fast as possible
              autoPlay={loadedVideos.includes(index.toString())}
              data-index={index}
              src={loadedVideos.includes(index.toString()) ? video : ""}
              poster="https://via.placeholder.com/300"
              onClick={() => handlePlayPause(index)}
              onLoadedData={() => {
                setLoading((prev) => {
                  const newLoading = [...prev];
                  newLoading[index] = false;
                  return newLoading;
                });
              }}
            ></video>
          </div>
        ))}
      </div>

      {/* Video Progress Bar */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full px-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => handleProgressChange(e, 0)}
          className="w-full"
        />
      </div>

      {/* Right-Side Icons */}
      <div className="absolute bottom-36 m-2 right-4 flex flex-col items-center gap-4 text-white">
        <div className="flex flex-col items-center cursor-pointer">
          <FontAwesomeIcon icon={faHeart} size="2x" className="text-white" />
          <span className="text-sm">120</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FontAwesomeIcon icon={faCommentDots} size="2x" />
          <span className="text-sm">45</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FontAwesomeIcon icon={faShare} size="2x" />
          <span className="text-sm">10</span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-center gap-14 items-center text-white m-4 absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <FontAwesomeIcon icon={faHome} size="lg" />
        <FontAwesomeIcon icon={faPlus} size="2x" className="text-white border-2 border-white rounded-full p-1" />
        <FontAwesomeIcon icon={faUser} size="lg" />
        <button className="bg-orange-400 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition">
          Satın Al
        </button>
      </div>
    </div>
  );
}

export default App;
