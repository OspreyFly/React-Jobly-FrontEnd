import React, { useState } from 'react';
import { JoblyApi } from '../api';
import { useUser } from './UserContext';
import './LoginSignUp.css';

const LoginSignUp = () => {
    const [Username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // New state for email
    const [fname, setFname] = useState(''); // New state for first name
    const [lname, setLname] = useState(''); // New state for last name
    const [loading, setLoading] = useState(false);
    const [showSignup, setShowSignup] = useState(true); // Controls which form is shown
    const { currentUser, setCurrentUser, setToken } = useUser();

    // Functions to handle state change
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handleFnameChange = (event) => {
        setFname(event.target.value);
    };


    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };

    const handleSubmitSignup = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const signupResponse = await JoblyApi.signup({
                username: Username,
                password: password,
                email: email,
                firstName: fname,
                lastName: lname
            });
            // Handle successful signup
            // Reset form fields or redirect as necessary
        } catch (error) {
            console.error("Signup failed:", error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const token = await JoblyApi.login({ username: Username, password: password });
            localStorage.setItem('joblyToken', token);
            const user = await JoblyApi.getCurrentUser(Username);
            setToken(token);
            setCurrentUser(user);
            // Optionally reset form fields or redirect
        } catch (error) {
            console.error("Login failed:", error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {showSignup ? (
                <div id="signup-container">
                    <h1>SignUp</h1>
                    <form onSubmit={handleSubmitSignup}>
                        <label>First Name:</label>
                        <input type="text" value={fname} onChange={handleFnameChange} />
                        <br />
                        <label>Last Name:</label>
                        <input type="text" value={lname} onChange={handleLnameChange} />
                        <br />
                        <label>Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange} />
                        <br />
                        <label>Username:</label>
                        <input type="text" value={Username} onChange={handleUsernameChange} />
                        <br />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                        <br />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            ) : (
                <div id="login-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmitLogin}>
                        <label>Username:</label>
                        <input type="text" value={Username} onChange={handleUsernameChange} />
                        <br />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                        <br />
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
            <button onClick={() => setShowSignup(!showSignup)}>
                {showSignup ? "Go to Log-In" : "Go to Sign-Up"}
            </button>
        </>
    );
};

export default LoginSignUp;
