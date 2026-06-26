import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AccountPage.scss";

const AccountPage = () => {
    return (
        <main>
            <h1>Account</h1>
            <LoginForm />
            <button>Create an account</button>
        </main>
    )
};

export default AccountPage;