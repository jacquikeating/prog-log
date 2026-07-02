import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase-client";
import "./LoginForm.scss";

const LoginForm = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    async function login() {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.error(`Error logging in: ${error.message}`);
                setLoginError(error.message);
            } else {
                setUserData(data);
                navigate("/");
            };
    };

    async function setUserData(loginData) {
        let sessionData = loginData.session;
        let userData = {
            id: sessionData.user.id
        };
            
        const { data: playerData, error } = await supabase.from("players")
            .select("*")
            .eq('user_id', sessionData.user.id)
            .single();
            if (error) {
                console.error(error);
                setError(error.message);
            } else {
                userData.name = playerData.name;
                userData.member_of = playerData.member_of;
                userData.permissions = playerData.permissions;
                setUser(userData);
            };
    }

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