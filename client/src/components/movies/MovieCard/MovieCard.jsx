import './MovieCard.css';

export const MovieCard = ({ movie, onClick, showOverlayTitle = true }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.jpg';

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div className="movie-card__image-wrapper">
        <img 
          src={posterUrl}
          alt={movie.title}
          className="movie-card__image"
          loading="lazy"
        />
        {showOverlayTitle && (
          <div className="movie-card__overlay-title">
            {movie.title}
          </div>
        )}
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__rating">
          {movie.vote_average?.toFixed(1)}
        </div>
      </div>
    </div>
  );
};