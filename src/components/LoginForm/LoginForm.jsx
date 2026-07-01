import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase-client";
import "./LoginForm.scss";

const LoginForm = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    async function login() {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.error(`Error logging in: ${error.message}`);
                setLoginError(error.message);
            } else {
                navigate("/");
            };
    };

    function handleSubmit(e) {
        e.preventDefault();
        login();
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
           <label htmlFor="email" className="login-form__label">
                Email
                <input 
                    type="email"
                    name="email" 
                    className="login-form__text-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label htmlFor="password" className="login-form__label">
                Password
                <input 
                    type="password"
                    name="password" 
                    className="login-form__text-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            {loginError && <p className="login-form__error">ERROR: {loginError}</p>}
            <button type="submit" className="login-form__submit">Login</button>
        </form>
    )
};

export default LoginForm;