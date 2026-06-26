import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.scss";

const LoginPage = () => {
    return (
        <main>
            <h1>Login</h1>
            <LoginForm />
            <button>Create an account</button>
        </main>
    )
};

export default LoginPage;