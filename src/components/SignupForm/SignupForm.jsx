import "./SignupForm.scss";

const SignupForm = ({}) => {

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }
    return (
        <div className="signup">
            <h2 className="signup__heading">Signup</h2>
            <form className="signup__form" onSubmit={handleSubmit}>
                <label>
                    Email
                    <input 
                        type="email"
                        name="email" 
                        className="signup__text-input"
                    />
                </label>
                <label>
                    Confirm Email
                    <input 
                        type="email"
                        name="email-confirm" 
                        className="signup__text-input"
                    />
                </label>
                <label>
                    Password
                    <input 
                        type="password"
                        name="password" 
                        className="signup__text-input"
                    />
                </label>
                <label>
                    Confirm Password
                    <input 
                        type="password"
                        name="password-confirm" 
                        className="signup__text-input"
                    />
                </label>
                <button type="submit" className="signup__submit">Submit</button>
            </form>
        </div>
    )
};

export default SignupForm;