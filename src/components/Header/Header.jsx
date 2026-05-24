import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__group nav__group--primary">
          <Link to="/" className="nav__site-logo">
            <img src="https://i.imgur.com/GNPU7aE.png"></img>
            <p className="nav__site-name">ProgLog</p>
          </Link>
        </div>
        <div className="nav__group nav__group--secondary">
        </div>
      </nav>
    </header>
  );
};

export default Header;