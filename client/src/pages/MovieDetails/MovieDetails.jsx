import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../../services/movieService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import { RatingStars } from '../../components/movies/RatingStars/RatingStars';
import { MovieCard } from '../../components/movies/MovieCard/MovieCard';
import './MovieDetails.css';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const [movieData, similarData] = await Promise.all([
          movieService.getMovieById(id),
          movieService.getSimilarMovies(id)
        ]);
        setMovie(movieData);
        setSimilarMovies(similarData);
        
        // Check if in watchlist (from localStorage for now)
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setIsInWatchlist(watchlist.includes(parseInt(id)));
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handlePlay = () => {
    navigate(`/watch/${id}`);
  };

  const handleToggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (isInWatchlist) {
      const newWatchlist = watchlist.filter(movieId => movieId !== parseInt(id));
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      setIsInWatchlist(false);
    } else {
      watchlist.push(parseInt(id));
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsInWatchlist(true);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!movie) return <div className="movie-details__error">Movie not found</div>;

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.jpg';

  return (
    <div className="movie-details">
      <button className="movie-details__back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="movie-details__content">
        <div 
          className="movie-details__backdrop" 
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
        <div className="movie-details__overlay" />

        <div className="movie-details__info-wrapper">
          <div className="movie-details__poster">
            <img src={posterUrl} alt={movie.title} />
          </div>

          <div className="movie-details__info">
            <h1 className="movie-details__title">{movie.title}</h1>
            {movie.tagline && (
              <p className="movie-details__tagline">{movie.tagline}</p>
            )}

            <div className="movie-details__meta">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <RatingStars rating={movie.vote_average} />
              <span className="movie-details__rating">
                ({movie.vote_count} votes)
              </span>
            </div>

            <div className="movie-details__genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="movie-details__genre">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-details__overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>

            <div className="movie-details__actions">
              <button className="movie-details__play-button" onClick={handlePlay}>
                ▶ Play Now
              </button>
              <button 
                className={`movie-details__watchlist-button ${isInWatchlist ? 'active' : ''}`}
                onClick={handleToggleWatchlist}
              >
                {isInWatchlist ? '✓ Added to Watchlist' : '+ Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div className="movie-details__similar">
          <h2>Similar Movies</h2>
          <div className="movie-details__similar-grid">
            {similarMovies.slice(0, 6).map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}