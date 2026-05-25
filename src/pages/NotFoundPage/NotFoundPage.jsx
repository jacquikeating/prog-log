import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
    return (
        <main className="not-found-page">
            <h1 className="not-found-page__heading">Error 404</h1>
            <p className="not-found-page__text">Page not found.</p>
            <Link className="not-found-page__link" to="/">
                <button className="not-found-page__button">Return to home</button>
            </Link>
        </main>
    );
};

export default NotFoundPage;