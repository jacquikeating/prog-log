import "./LoginForm.scss";

const LoginForm = ({}) => {
        function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }
    
    return (
        <div className="login">
            {/* <h2 className="login__heading">Login</h2> */}
            <form className="login__form" onSubmit={handleSubmit}>
                <label for="email" className="login__label">Email</label>
                    <input 
                        type="email"
                        name="email" 
                        className="login__text-input"
                        placeholder="Email"
                    />
                
                <label for="password" className="login__label">Password</label>
                    <input 
                        type="password"
                        name="password" 
                        className="login__text-input"
                        placeholder="Password"
                    />
                
                <button type="submit" className="login__submit">Submit</button>
            </form>
        </div>
    )
};

export default LoginForm;