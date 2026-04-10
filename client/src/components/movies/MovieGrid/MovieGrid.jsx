// components/movies/MovieGrid/MovieGrid.jsx
import { useState } from "react";
import './MovieGrid.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieGrid = ({ title, movies, onMovieClick }) => {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const handleMouseEnter = (movieId) => {
    setHoveredMovieId(movieId);
    if (window.titleTimeout) clearTimeout(window.titleTimeout);
    window.titleTimeout = setTimeout(() => {
      setHoveredMovieId(null);
    }, 5000);
  };

  const handleMouseLeave = () => {
    if (window.titleTimeout) {
      clearTimeout(window.titleTimeout);
      setHoveredMovieId(null);
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-grid">
      <h2 className="movie-grid__title">{title}</h2>
      <div className="movie-grid__container">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick(movie.id)}
            onMouseEnter={() => handleMouseEnter(movie.id)}
            onMouseLeave={handleMouseLeave}
            showTitle={hoveredMovieId === movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;