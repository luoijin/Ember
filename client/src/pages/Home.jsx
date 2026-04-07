import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularMovies()
      .then(data => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Popular Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {movies.map(movie => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;