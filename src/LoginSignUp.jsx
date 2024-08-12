import React, { useState } from 'react';

const LoginSignUp = () => {
    const [Username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle Username change
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    // Function to handle password change
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        // Here you would call your API to log in or sign up
        // After successful operation, reset the form and loading state
        setLoading(false);
    };

    return (
        <div>
            <h1>Login / SignUp</h1>
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="Username" value={Username} onChange={handleUsernameChange} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
                <br />
                <button type="submit">Login</button>
            </form>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="Username" value={Username} onChange={handleUsernameChange} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default LoginSignUp;
