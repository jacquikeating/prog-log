import "./LoginForm.scss";

const LoginForm = ({}) => {
        function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }
    
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label for="email" className="login-form__label">Email
                <input 
                    type="email"
                    name="email" 
                    className="login-form__text-input"
                />
            </label>
                
            
            <label for="password" className="login-form__label">Password
                <input 
                    type="password"
                    name="password" 
                    className="login-form__text-input"
                />
            </label>
                
            
            <button type="submit" className="login-form__submit">Submit</button>
        </form>
    )
};

export default LoginForm;