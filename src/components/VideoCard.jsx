import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../pages/feed.css";

function VideoCard(props) {
  const pageRoute = useNavigate();
  const { darkMode } = useSelector((state) => state.darkMode);

  // State for loading animation
  const [loading, setLoading] = useState(true);

  // Simulate data load delay (remove in production)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulates 1s delay
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      style={{ width: props.width }}
      className="flex flex-col w-full sm:w-[90%] md:w-full cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      {loading ? (
        // Skeleton Loader for Thumbnail
        <div className="w-full h-[200px] md:h-[180px] lg:h-[220px] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      ) : (
        // Thumbnail
        <img
          onClick={() => pageRoute(`/watch/${props.videoId}`)}
          src={props.thumbnail}
          alt="Video Thumbnail"
          className="w-full h-[200px] md:h-[180px] lg:h-[220px] object-cover rounded-lg transition-transform duration-200 hover:scale-105"
        />
      )}

      <div
        style={{ width: props.rightWidth }}
        className="flex gap-x-3 items-start mt-3"
      >
        <div>
          {loading ? (
            // Skeleton Loader for Title
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          ) : (
            <h3
              onClick={() => pageRoute(`/watch/${props.videoId}`)}
              className={`text-[14px] lg:text-[16px] font-semibold leading-[20px] w-[94%] truncate ${darkMode ? "text-white" : "text-black"
                }`}
            >
              {props.title?.slice(0, 60)}
            </h3>
          )}

          <div className="mt-1">
            {loading ? (
              <>
                {/* Skeleton Loader for Channel Name */}
                <div className="w-24 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                {/* Skeleton Loader for Date */}
                <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              </>
            ) : (
              <>
                <p
                  onClick={() => pageRoute(`/channel/${props.channelId}`)}
                  className="text-[12px] lg:text-[14px] text-[#606060] font-medium tracking-wide hover:underline"
                >
                  {props.channel}
                </p>
                <p
                  onClick={() => pageRoute(`/watch/${props.videoId}`)}
                  className="text-[12px] lg:text-[14px] text-[#606060] font-medium tracking-wide hover:underline -mt-1"
                >
                  {props.on}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default VideoCard;
