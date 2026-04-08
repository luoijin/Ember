import { MovieCard } from '../MovieCard/MovieCard';
import { useNavigate } from 'react-router-dom';
import './MovieGrid.css';

export const MovieGrid = ({ title, movies }) => {
  const navigate = useNavigate();

  if (!movies || movies.length === 0) return null;

  return (
    <section className="movie-grid">
      <h2 className="movie-grid__title">{title}</h2>
      <div className="movie-grid__container">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        ))}
      </div>
    </section>
  );
};