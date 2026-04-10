import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularMovies, getTopRated, getNowPlaying, getUpcoming } from "../../services/api";
import './Home.css';                              // ✅ CSS import
import MovieGrid from '../../components/movies/MovieGrid/MovieGrid';  // ✅ Component
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';  // ✅ Component
// ❌ REMOVE this line: import "../../styles/global.css"; 

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <LoadingSpinner />;  // ✅ Now using LoadingSpinner component

  return (
    <div className="home">
      {/* Hero Section - matches your Home.css */}
      <div className="home__hero">
        <div className="home__hero-overlay"></div>
        <div className="home__hero-content">
          <h1 className="home__hero-title">Welcome to Ember Movies</h1>
          <p className="home__hero-subtitle">
            Discover the best movies, TV shows, and more.
          </p>
        </div>
      </div>

      <div className="container">
        {/* ✅ Using MovieGrid component instead of MovieSection */}
        <MovieGrid 
          title="Popular Movies" 
          movies={popularMovies}
          onMovieClick={(id) => navigate(`/movie/${id}`)}
        />
        
        <MovieGrid 
          title="Top Rated Movies" 
          movies={topRatedMovies}
          onMovieClick={(id) => navigate(`/movie/${id}`)}
        />
        
        <MovieGrid 
          title="Now Playing on Theaters" 
          movies={nowPlaying}
          onMovieClick={(id) => navigate(`/movie/${id}`)}
        />
        
        <MovieGrid 
          title="Upcoming Movies" 
          movies={upcoming}
          onMovieClick={(id) => navigate(`/movie/${id}`)}
        />
      </div>
    </div>
  );
};

export default Home;