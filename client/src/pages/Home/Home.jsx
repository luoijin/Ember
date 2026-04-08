import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularMovies, getTopRated, getNowPlaying, getUpcoming } from "../../services/api";
// import "..App";
import "../../styles/global.css"; 

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getPopularMovies(), getTopRated(), getNowPlaying(), getUpcoming()])
      .then(([popular, topRated, nowPlaying, upcoming]) => {
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setNowPlaying(nowPlaying);
        setUpcoming(upcoming);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  // Handle hover with 5 second timeout
  const handleMouseEnter = (movieId) => {
    setHoveredMovieId(movieId);
    // Clear previous timeout if exists
    if (window.titleTimeout) clearTimeout(window.titleTimeout);
    // Set timeout to clear after 5 seconds
    window.titleTimeout = setTimeout(() => {
      setHoveredMovieId(null);
    }, 5000);
  };

  const handleMouseLeave = () => {
    // Clear the timeout and hide title immediately when mouse leaves
    if (window.titleTimeout) {
      clearTimeout(window.titleTimeout);
      setHoveredMovieId(null);
    }
  };

  if (loading) return <div className="loading">Loading movies...</div>;

  // Reusable movie section component
  const MovieSection = ({ title, movies }) => (
    <div className="movie-section">
      <h1>{title}</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
            onMouseEnter={() => handleMouseEnter(movie.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title} 
            />
            {hoveredMovieId === movie.id && (
              <div className="movie-title-overlay">
                {movie.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container">
      <MovieSection title="Popular Movies" movies={popularMovies} />
      <MovieSection title="Top Rated Movies" movies={topRatedMovies} />
      <MovieSection title="Now Playing on Theaters" movies={nowPlaying} />
      <MovieSection title="Upcoming Movies" movies={upcoming} />
    </div>
  );
};

export default Home;