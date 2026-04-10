import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "./Watch.css";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoContainerRef = useRef(null);

  return (
    <div className="watch-container">
      <div className="watch-header">
        <button className="back-button" onClick={() => navigate(-1)}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
</button>

      </div>

      <div className="video-wrapper" ref={videoContainerRef}>
        <iframe
          className="video-iframe"
          src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
          title="Movie Player"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Watch;