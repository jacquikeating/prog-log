import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase-client";
import "./SignupForm.scss";

const SignupForm = ({}) => {
    const [charName, setCharName] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);

    async function createAccount() {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error('Error signing up: ', error);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        
        if (email != emailConfirm) {
            setEmailErr(true);
            return;
        };
        if (emailErr == true && email == emailConfirm) {
            setEmailErr(false);
        };
        if (password != passwordConfirm) {
            setPasswordErr(true);
            return;
        };
        if (passwordErr == true && password == passwordConfirm) {
            setPasswordErr(false);
        };

        createAccount();
    };
    
    return (

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-form__section">
                    <label htmlFor="username" className="signup-form__label">
                        Character Name
                        <input 
                            type="text"
                            name="username" 
                            className="signup-form__text-input"
                            value={charName}
                            onChange={(e) => setCharName(e.target.value)}
                            required
                        />
                    </label>
                    <p className="signup-form__error-hidden">
                        placeholder
                    </p>
                </div>
                <div className="signup-form__section">
                    <label htmlFor="email" className="signup-form__label">
                        Email
                        <input 
                            type="email"
                            name="email" 
                            className="signup-form__text-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="email-confirm" className="signup-form__label">
                        Confirm Email
                        <input 
                            type="email"
                            name="email-confirm" 
                            className="signup-form__text-input"
                            value={emailConfirm}
                            onChange={(e) => setEmailConfirm(e.target.value)}
                            required
                        />
                    </label>
                    <p className={emailErr ? "signup-form__error" : "signup-form__error-hidden"}>
                        Error: Email addresses do not match
                    </p>
                </div>
                <div className="signup-form__section">
                    <label htmlFor="password" className="signup-form__label">
                        Password
                        <input 
                            type="password"
                            name="password" 
                            className="signup-form__text-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="password-confirm" className="signup-form__label">
                        Confirm Password
                        <input 
                            type="password"
                            name="password-confirm" 
                            className="signup-form__text-input"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </label>
                    <p className={passwordErr ? "signup-form__error" : "signup-form__error-hidden"}>
                        Error: Passwords do not match
                    </p>
                </div>
                <button type="submit" className="signup-form__submit">Sign Up</button>
            </form>
    )
};

export default SignupForm;