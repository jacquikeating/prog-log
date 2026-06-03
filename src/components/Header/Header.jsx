import { Link } from "react-router-dom";
import SelectStaticUlti from "../../components/SelectStaticUlti/SelectStaticUlti";
import "./Header.scss";

const Header = ({ latestSession }) => {
  const urlParamsString = localStorage.getItem("urlParams");

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__group nav__group--primary">
          <Link to={`/${urlParamsString}` || "/"} className="nav__site-logo">
            <img src="https://i.imgur.com/GNPU7aE.png"></img>
            <p className="nav__site-name">ProgLog</p>
          </Link>
          <ul className="nav__list">
            <li className="nav__list-item">
              <Link to={`/${urlParamsString}` || "/"} className="nav__link">
                Home
              </Link>
            </li>
            <li className="nav__list-item">
              <Link to={`/report/${urlParamsString}/${latestSession}`} className="nav__link">
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