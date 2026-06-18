import "./LoginForm.scss";

const LoginForm = ({}) => {
        function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }
    
    return (
        <div className="login">
            <h2 className="login__heading">Signup</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <label>
                    Email
                    <input 
                        type="email"
                        name="email" 
                        className="login__text-input"e
                    />
                </label>
                
                <label>
                    Password
                    <input 
                        type="password"
                        name="password" 
                        className="login__text-input"
                    />
                </label>
                <button type="submit" className="login__submit">Submit</button>
            </form>
        </div>
    )
};

export default LoginForm;