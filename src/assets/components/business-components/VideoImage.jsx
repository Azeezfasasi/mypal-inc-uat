import React, { useState } from 'react';
// import vidimg2 from '../../images/vidimg2.svg'
import bgvid from '../../images/bgvid.jpg'
import mypal from '../../videos/mypal.mp4'

const VideoImage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePlay = () => {
      setIsPlaying(true);
    };

  return (
    <>
    <div className="relative w-[90%] md:w-[90%] h-[0%] mx-auto rounded-[20px] overflow-hidden mt-[40px] md:mt-[70px] mb-[50px] md:mb-[70px]">
      {!isPlaying ? (
        <div
          className="relative w-full aspect-[16/9] cursor-pointer"
          onClick={handlePlay}
        >
          <img
            src={bgvid}
            alt="Preview"
            className="w-full h-full object-cover rounded-[20px]"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[rgba(251,251,251,0.69)] rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
              <div className="bg-orange-500 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8 sm:w-10 sm:h-10 ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <video
          src={mypal}
          controls
          autoPlay
          className="w-full rounded-[20px] aspect-[16/9] object-contain"
        />
      )}
    </div>
    </>
  );
};

export default VideoImage;
