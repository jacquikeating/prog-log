import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.scss";

const LoginPage = () => {
    return (
        <main className="login">
            <h1>Login</h1>
            <LoginForm />
            <Link className="login__create-acct-link" to="/signup">Create an account</Link>
        </main>
    )
};

export default LoginPage;