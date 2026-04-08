import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { movieService } from '../../services/movieService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import './Watch.css';

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await movieService.getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!movie) return <div>Movie not found</div>;

  // Using a placeholder video URL - replace with actual streaming URL
  const videoUrl = `https://www.youtube.com/embed/${movie.video_key || 'dQw4w9WgXcQ'}?autoplay=1`;

  return (
    <div className="watch">
      <div className="watch__header">
        <button className="watch__back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="watch__title">{movie.title}</h1>
      </div>

      <div className="watch__video-wrapper">
        <iframe
          ref={videoRef}
          className="watch__video-iframe"
          src={videoUrl}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button className="watch__fullscreen-btn" onClick={handleFullscreen}>
          ⛶
        </button>
      </div>
    </div>
  );
}