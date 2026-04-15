import './MovieCard.css';

const MovieCard = ({ movie, onClick, onMouseEnter, onMouseLeave, showTitle }) => {
  return (
    <div 
      className="movie-card"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="movie-card__image-wrapper">
        <img 
          className="movie-card__image"
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
          alt={movie.title} 
        />
      </div>
      {showTitle && (
        <div className="movie-card__overlay-title">
          {movie.title}
        </div>
      )}
    </div>
  );
};

export default MovieCard;