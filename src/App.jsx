import React, { useState } from "react";
import v1 from "./assets/v1.mp4";

import v3 from "./assets/v3.mp4"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentDots,
  faShare,
  faPlus,
  faHome,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const videos = [v1,v3]; 

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  return (
    <div className="h-screen w-full bg-black flex flex-col ">
   

      {/* Video Field */}
      <div
        className="flex-grow overflow-y-auto snap-mandatory snap-y "
        style={{ scrollSnapType: "y mandatory" }} 
      >
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative w-full h-screen snap-start"
          >
            <video
              className="w-full h-screen object-cover my-2" 
              autoPlay
              loop
              muted
              src={video}
            ></video>
              {/*Right Icons */}
            <div className="absolute top-1/4 right-4 flex flex-col items-center gap-6 text-white">
              <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={faHeart} size="2x" className="text-red-500" />
                <span className="text-sm">120.5K</span>
              </div>
              <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={faCommentDots} size="2x" className="text-white" />
                <span className="text-sm">15.2K</span>
              </div>
              <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={faShare} size="2x" className="text-white" />
                <span className="text-sm">5.4K</span>
              </div>
              <FontAwesomeIcon icon={faSearch} size="lg" />
             
            </div>
 

          
          
          </div>
          
        ))}
        {/* Bottom Icons and Buy Button */}
        <div className="flex justify-center gap-14 items-center text-white m-4 absolute bottom-0 left-1/2 transform -translate-x-1/2">
  <FontAwesomeIcon icon={faHome} size="lg" />
  <FontAwesomeIcon icon={faPlus} size="2x" className="text-white border-2 border-white rounded-full p-1" />
  <FontAwesomeIcon icon={faUser} size="lg" />
  <button className="bg-orange-400 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition ">
    Satın Al
  </button>
</div>


    

      </div>

  
    </div>
  );
}

export default App;
