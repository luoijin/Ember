import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import BackButton from "../../components/common/Button/Backbutton";
import "./Watch.css";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoContainerRef = useRef(null);

  return (
    <div className="watch-container">
      <div className="watch-header">
        <BackButton />

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
