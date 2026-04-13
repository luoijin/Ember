import './LoadingSpinner.css';

export const LoadingSpinner = ({ inline = false }) => {
  return (
    <div className={`loading-spinner ${inline ? 'loading-spinner--inline' : ''}`}>
      <div className="loading-spinner__content">
        <div className="loading-spinner__icon"></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 
