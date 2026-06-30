import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase-client";
import { addUserToPlayersTable } from "../../utils/crud-functions";
import "./SignupForm.scss";

const SignupForm = ({}) => {
    const [charName, setCharName] = useState("");
    const [memberOf, setMemberOf] = useState("wall-is-safe"); // Temporarily hardcoded, add a <select> for statics when the platform can support multiple statics
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [emailMatch, setEmailMatch] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [signupError, setSignupError] = useState(null);
    const navigate = useNavigate();

    async function createAccount() {
        const { data, error } = await supabase.auth.signUp({
            email, 
            password,
            options: {
                data: {
                    character_name: charName,
                    member_of: memberOf 
                },
            },
        });
        if (error) {
            console.error('Error signing up: ', error);
            setSignupError(error.message);
        } else {
            const playerData = {
                user_id: data.user.id,
                name: charName,
                member_of: memberOf
            };
            addUserToPlayersTable(playerData);
            navigate("/account");
        };
    };

    function handleSubmit(e) {
        e.preventDefault();
        let doEmailsMatch = email == emailConfirm;
        let doPasswordsMatch = password == passwordConfirm;
        setEmailMatch(doEmailsMatch);
        setPasswordMatch(doPasswordsMatch);
        setSignupError(null);

        if (!doEmailsMatch || !doPasswordsMatch) {
            return;
        }

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
                    {emailMatch == false && <p className="signup-form__error">ERROR: Email addresses do not match</p>}
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
                    {passwordMatch == false && <p className="signup-form__error">ERROR: Passwords do not match</p>}
                </div>
                {signupError && <p className="signup-form__error">ERROR: {signupError}</p>}
                <button type="submit" className="signup-form__submit">Sign Up</button>
            </form>
    )
};

export default SignupForm;