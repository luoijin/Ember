import './RatingStars.css';

export const RatingStars = ({ rating, max = 10, interactive = false, size = 'medium' }) => {
  const normalizedRating = (rating / max) * 5;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating - fullStars >= 0.5;
  
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="rating-stars__star rating-stars__star--filled">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="rating-stars__star rating-stars__star--half">★</span>);
      } else {
        stars.push(<span key={i} className="rating-stars__star">☆</span>);
      }
    }
    
    return stars;
  };

  return (
    <div className={`rating-stars rating-stars--${size} ${interactive ? 'rating-stars--interactive' : ''}`}>
      {renderStars()}
      <span className="rating-stars__value">({rating?.toFixed(1)})</span>
    </div>
  );
};