import { Link } from "react-router-dom";
import SelectStaticUlti from "../../components/SelectStaticUlti/SelectStaticUlti";
import "./Header.scss";

const Header = ({ latestSession, user }) => {

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__group nav__group--primary">
          <Link to="/" className="nav__site-logo">
            <div>🤡</div>
            <p className="nav__site-name">ProgLog</p>
          </Link>
          <ul className="nav__list">
            <li className="nav__list-item">
              <Link to="/" className="nav__link">
                Home
              </Link>
            </li>
            <li className="nav__list-item">
              <Link to={`/report/${latestSession}`} className="nav__link">
                Latest
              </Link>
            </li>
            <li className="nav__list-item">
              <Link to="/about" className="nav__link">
                About
              </Link>
            </li>
            {/* <li className="nav__list-item">
              <Link to="/clips" className="nav__link">
                Clips
              </Link>
            </li>
            <li className="nav__list-item">
              <Link to="/timeline" className="nav__link">
                Timeline
              </Link>
            </li> */}
              {/* <SelectStaticUlti /> */}

            {user?.permissions === "admin" ? (
              <>
                <li className="nav__list-item">
                  <Link to="/add" className="nav__link">
                    Add Data
                  </Link>
                </li>
                <li className="nav__list-item">
                  <Link to="/admin" className="nav__link">
                    Admin
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="nav__group nav__group--secondary">
          <ul className="nav__list">
            <li className="nav__list-item">
              {user ? (
                <Link to="/account" className="nav__link">
                  Account
                </Link>
              ) : (
                <Link to="/login" className="nav__link">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;