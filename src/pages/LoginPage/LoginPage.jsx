import { Link, useOutletContext } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.scss";

const LoginPage = () => {
    const { user, setUser } = useOutletContext();

    return (
        <main className="login">
            <h1 className="login__heading">Login</h1>
            <LoginForm setUser={setUser} />
            <Link className="login__create-acct-link" to="/signup">Create an account</Link>
        </main>
    );
};

export default LoginPage;