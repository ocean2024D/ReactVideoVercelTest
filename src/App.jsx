import React, { useState, useRef, useEffect } from "react";
import v1 from "./assets/v1.mp4";
import v3 from "./assets/v3.mp4"; 
import v2 from "./assets/v2.mp4"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const videos = [v1, v2, v3];

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1); // Video hızı (1: normal, 2: 2x hız, 0.5: yarım hız)
  const videoRef = useRef(null);

  const updateProgress = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressChange = (e) => {
    if (videoRef.current) {
      const newTime = (e.target.value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = () => {
    const newSpeed = speed === 1 ? 2 : (speed === 2 ? 0.5 : 1); // hız döngüsü 1x -> 2x -> 0.5x -> 1x
    setSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed; // Video hızını ayarla
    }
  };

  // Video oynatmaya başlamak için useEffect ekleyelim
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div className="h-screen w-full bg-black flex flex-col relative ">
      <div className="flex-grow overflow-y-auto snap-mandatory snap-y" style={{ scrollSnapType: "y mandatory" }}>
        {videos.map((video, index) => (
          <div key={index} className="relative w-full h-screen snap-start">
            <video
              ref={videoRef}
              className="w-full h-screen object-cover my-2"
              loop
              muted
              autoPlay // Otomatik oynatma özelliği
              src={video}
              onClick={handlePlayPause} // Videoya tıklandığında oynat/durdur işlemi yapılacak
            ></video>
          </div>
        ))}
      </div>

      {/* Video Control Bar */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full px-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full"
        />
      </div>

      {/* Bottom Icons and Buy Button */}
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
