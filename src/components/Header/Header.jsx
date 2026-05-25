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
          <ul className="nav__list">
            <li className="nav__list-item">
              <Link to="/" className="nav__link">
                Home
              </Link>
            </li>
            <li className="nav__list-item">
              {/* <Link to={`/report/${latestSession}`} className="nav__link"> */}
              <Link to={`/report/x`} className="nav__link"> {/* Temp */}
                Latest
              </Link>
            </li>
            <li className="nav__list-item">
              <Link to="/about" className="nav__link">
                About
              </Link>
            </li>
            <li className="nav__list-item">
              <Link to="/clips" className="nav__link">
                Clips
              </Link>
            </li>
            <li className="nav__list-item">
              <Link to="/timeline" className="nav__link">
                Timeline
              </Link>
            </li>
            {/* {role === "admin" ? (
              <li className="nav__list-item">
                <Link to="/add-data" className="nav__link">
                  Add Data
                </Link>
              </li>
            ) : (
              ""
            )} */}
          </ul>
        </div>
        <div className="nav__group nav__group--secondary">
        </div>
      </nav>
    </header>
  );
};

export default Header;