import "./SignupForm.scss";

const SignupForm = ({}) => {

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }
    
    return (

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-form__section">
                    <label for="email" className="signup-form__label">
                        Email
                        <input 
                            type="email"
                            name="email" 
                            className="signup-form__text-input"
                        />
                    </label>
                    <label for="email-confirm" className="signup-form__label">
                        Confirm Email
                        <input 
                            type="email"
                            name="email-confirm" 
                            className="signup-form__text-input"
                        />
                    </label>
                </div>
                <div className="signup-form__section">
                    <label for="password" className="signup-form__label">
                        Password
                        <input 
                            type="password"
                            name="password" 
                            className="signup-form__text-input"
                        />
                    </label>
                    <label for="password-confirm" className="signup-form__label">
                        Confirm Password
                        <input 
                            type="password"
                            name="password-confirm" 
                            className="signup-form__text-input"
                        />
                    </label>
                </div>
                <button type="submit" className="signup-form__submit">Sign Up</button>
            </form>
    )
};

export default SignupForm;