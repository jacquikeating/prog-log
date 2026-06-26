import { useState } from "react";
import { Link } from "react-router-dom";
import SignupForm from "../../components/SignupForm/SignupForm";
import "./SignupPage.scss";

const SignupPage = () => {
    return (
        <main className="signup">
            <h1>Create an Account</h1>
            <SignupForm />
        </main>
    )
};

export default SignupPage;