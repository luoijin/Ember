import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__brand">
                    <h3 className="footer__logo">Ember</h3>
                    <p className="footer__tagline">&copy; {currentYear} Ember. This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
                </div>

                <div className="footer__links">
                    <Link to="/terms" className="footer__link">Terms of Service</Link>
                    <span className="footer__divider">|</span>
                    <Link to="/contact" className="footer__link">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;