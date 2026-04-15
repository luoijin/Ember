import './BackButton.css';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ onClick, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1); // Default: go back
    }
  };

  return (
    <button className="back-button" onClick={handleClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
  );
};

export default BackButton;