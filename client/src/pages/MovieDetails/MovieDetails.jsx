import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchLater, setWatchLater] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        // First try to get recommendations (usually better than similar)
        const recRes = await fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
        const recData = await recRes.json();
        
        let movies = recData.results;
        
        // If recommendations are empty, try similar movies
        if (movies.length === 0) {
          const simRes = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
          const simData = await simRes.json();
          movies = simData.results;
        }
        
        // Filter out movies with very different genres or low ratings
        const currentMovieGenres = movie?.genres?.map(g => g.id) || [];
        
        const filteredMovies = movies
          .filter(m => {
            // Remove movies with no poster
            if (!m.poster_path) return false;
            // Remove movies with very low ratings (below 5)
            if (m.vote_average < 5) return false;
            return true;
          })
          .slice(0, 12); // Get top 12 movies
        
        setSimilarMovies(filteredMovies);
        setSimilarLoading(false);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
        setSimilarLoading(false);
      }
    };

    const checkWatchLater = () => {
      const watchLaterList = JSON.parse(localStorage.getItem("watchLater") || "[]");
      setWatchLater(watchLaterList.includes(parseInt(id)));
    };

    fetchMovieDetails().then(() => {
      fetchSimilarMovies();
    });
    checkWatchLater();
  }, [id]);

  const handleWatchLater = () => {
    const watchLaterList = JSON.parse(localStorage.getItem("watchLater") || "[]");
    
    if (watchLaterList.includes(parseInt(id))) {
      const updatedList = watchLaterList.filter(movieId => movieId !== parseInt(id));
      localStorage.setItem("watchLater", JSON.stringify(updatedList));
      setWatchLater(false);
    } else {
      watchLaterList.push(parseInt(id));
      localStorage.setItem("watchLater", JSON.stringify(watchLaterList));
      setWatchLater(true);
    }
  };

  const handlePlayNow = () => {
    navigate(`/watch/${id}`);
  };

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (!movie) return <div className="loading">Movie not found</div>;

  return (
    <div className="movie-details-container">
     <button className="back-button" onClick={() => navigate("/")}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
</button>

      <div className="movie-details-content">
        <div 
          className="movie-backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          }}
        >
          <div className="backdrop-overlay"></div>
        </div>

        <div className="movie-info-wrapper">
          <div className="movie-poster">
            <img 
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} 
              alt={movie.title}
            />
          </div>

          <div className="movie-info">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
            
            <div className="movie-meta">
              <span className="rating">★ {movie.vote_average?.toFixed(1)}</span>
              <span>{movie.release_date?.split("-")[0]}</span>
              <span>{movie.runtime} min</span>
            </div>

            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre">{genre.name}</span>
              ))}
            </div>

            <div className="overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>

            <div className="button-group">
              <button className="play-button" onClick={handlePlayNow}>
                ▶ Play Now
              </button>
              <button 
                className={`watch-later-button ${watchLater ? 'active' : ''}`} 
                onClick={handleWatchLater}
              >
                {watchLater ? '✓ Added to Watch Later' : '⏱ Watch Later'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="similar-movies-section">
        <h2>You Might Also Like</h2>
        {similarLoading ? (
          <div className="similar-loading">Loading recommendations...</div>
        ) : similarMovies.length > 0 ? (
          <div className="similar-movies-grid">
            {similarMovies.map(movie => (
              <div 
                key={movie.id} 
                className="similar-movie-card"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img 
                  src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
                    : "https://via.placeholder.com/200x300?text=No+Poster"
                  } 
                  alt={movie.title}
                />
                <div className="similar-movie-info">
                  <h4>{movie.title}</h4>
                  <p className="similar-movie-rating">★ {movie.vote_average?.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-similar-movies">No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;