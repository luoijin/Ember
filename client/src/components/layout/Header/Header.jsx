import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/logo.png';
import './Header.css';


const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo" onClick={() => navigate('/')}>
          <img src={logo} className="header__logo-image" />
          <span className="header__logo-text">Ember</span>
        </div>

        {/* Navigation */}
        <nav className="header__nav">
          <Link to="/" className="header__nav-link">Home</Link>
          <Link to="/" className="header__nav-link">Browse</Link>
          <Link to="/watch-later" className="header__nav-link">Watch Later</Link>
        </nav>

        {/* Search Icon */}
        <div className="header__search">
          <button className="header__search-button" onClick={() => navigate('/search')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        

        <div className="header__user">
          <button className="header__user-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;