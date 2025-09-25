import React, { useState } from 'react';
import videoimage from '../../images/videoimage.svg'
import videoplay from '../../images/videoplay.svg'
import businessvideo from '../../videos/businessvideo.mp4'

const VideoImage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
    // The URL of the video to be played.
  const videoUrl = businessvideo;
  
  // The URL of the thumbnail image.
  const thumbnailUrl = videoimage;

  return (
    <div className="lg:h-[559px] w-[100%] bg-white p-4 sm:p-8 flex items-center justify-center font-sans antialiased mt-6 lg:mt-16 mb-16">
      <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl">
        
        {/* The video element, only rendered when isPlaying is true */}
        {isPlaying && (
          <video
            className="absolute inset-0 w-full h-[100%] object-fill"
            src={videoUrl}
            autoPlay
            controls
          ></video>
        )}

        {/* The thumbnail image and play button, only rendered when isPlaying is false */}
        {!isPlaying && (
          <div className="relative w-full h-full">
            <img
              src={thumbnailUrl}
              alt="Video Thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-full transform transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                <img src={videoplay} alt="" className='cursor-pointer'/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoImage;
