import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetails from "../../components/movies/MovieDetails/MovieDetails";
import MovieGrid from "../../components/movies/MovieGrid/MovieGrid";
import BackButton from "../../components/common/Button/Backbutton";
import "./MovieDetails.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [movieLoading, setMovieLoading] = useState(true);
  const [watchLater, setWatchLater] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [similarMoviesCache, setSimilarMoviesCache] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovie(data);
        setMovieLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovieLoading(false);
      }
    };

    const fetchSimilarMovies = async () => {
      if (similarMoviesCache[id]) {
        setSimilarMovies(similarMoviesCache[id]);
        setSimilarLoading(false);
        return;
      }

      try {
        const recRes = await fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
        const recData = await recRes.json();
        
        let movies = recData.results;
        
        if (movies.length === 0) {
          const simRes = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
          const simData = await simRes.json();
          movies = simData.results;
        }
        
        const filteredMovies = movies
          .filter(m => m.poster_path && m.vote_average >= 5)
          .slice(0, 12);
        
        setSimilarMoviesCache(prev => ({ ...prev, [id]: filteredMovies }));
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

    fetchMovieDetails();
    fetchSimilarMovies();
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

  if (movieLoading) return <div className="loading">Loading movie details...</div>;
  if (!movie) return <div className="loading">Movie not found</div>;

  return (
    <div className="movie-details-container">
      <BackButton />

      <MovieDetails 
        movie={movie}
        onPlayNow={handlePlayNow}
        onWatchLater={handleWatchLater}
        isWatchLater={watchLater}
      />

      {similarLoading ? (
        <div className="similar-loading">Loading recommendations...</div>
      ) : similarMovies.length > 0 ? (
        <MovieGrid 
          title="You Might Also Like"
          movies={similarMovies}
          onMovieClick={(movieId) => navigate(`/movie/${movieId}`)}
        />
      ) : (
        <p className="no-similar-movies">No recommendations available</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;