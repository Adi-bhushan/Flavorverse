import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';

export const Auth = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className="auth-page">
            {isRegistering ? <Register setIsRegistering={setIsRegistering} /> : <Login />}

            <button className="toggle-form-btn" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering 
                    ? "Already have an account? Login" 
                    : "Don't have an account? Register"}
            </button>
        </div>
    );
};

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await apiClient.post("/auth/login", {
                username,
                password,
            });
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
        />
    );
};

const Register = ({ setIsRegistering }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await apiClient.post("/auth/register", {
                username,
                password,
            });
            alert("Registration Completed! Now login.");
            setIsRegistering(false);
        } catch (err) {
            console.error(err);
            alert("Registration failed. Username may already be taken.");
        }
    };

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={onSubmit}
        />
    );
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor={`username-${label}`}>Username:</label>
                    <input 
                        type="text" 
                        id={`username-${label}`} 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`password-${label}`}>Password:</label>
                    <input 
                        type="password" 
                        id={`password-${label}`} 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">{label}</button>
            </form>
        </div>
    );
};