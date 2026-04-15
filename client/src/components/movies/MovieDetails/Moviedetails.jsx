import './MovieDetails.css';

const MovieDetails = ({ movie, onPlayNow, onWatchLater, isWatchLater }) => {
  if (!movie) return null;

  return (
    <div className="movie-details">
      <div className="movie-details__content">
        <div 
          className="movie-details__backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          }}
        >
          <div className="movie-details__overlay"></div>
        </div>

        <div className="movie-details__info-wrapper">
          <div className="movie-details__poster">
            <img 
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} 
              alt={movie.title}
            />
          </div>

          <div className="movie-details__info">
            <h1 className="movie-details__title">{movie.title}</h1>
            {movie.tagline && <p className="movie-details__tagline">{movie.tagline}</p>}
            
            <div className="movie-details__meta">
              <span className="movie-details__rating">★ {movie.vote_average?.toFixed(1)}</span>
              <span>{movie.release_date?.split("-")[0]}</span>
              <span>{movie.runtime} min</span>
            </div>

            <div className="movie-details__genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="movie-details__genre">{genre.name}</span>
              ))}
            </div>

            <div className="movie-details__overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>

            <div className="movie-details__actions">
              <button className="movie-details__play-button" onClick={onPlayNow}>
                ▶ Play Now
              </button>
              <button 
                className={`movie-details__watch-later-button ${isWatchLater ? 'active' : ''}`} 
                onClick={onWatchLater}
              >
                {isWatchLater ? '✓ Added to Watch Later' : '⏱ Watch Later'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;