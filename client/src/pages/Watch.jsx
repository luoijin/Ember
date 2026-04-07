import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "../Watch.css";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await videoContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="watch-container">
      <div className="watch-header">
        <button className="watch-back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <h1 className="watch-title">Now Playing</h1>
      </div>
      
      <div className="video-wrapper" ref={videoContainerRef}>
        <iframe
          className="video-iframe"
          src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
          title="Movie Player"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
        />
        <button 
          className="fullscreen-btn" 
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Watch;