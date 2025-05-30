import { useState } from "react";

import "../css/pages/Login.css";
import sweetyLogo from "../assets/sweety-logo.svg";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import Input from "../components/Input.jsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <title>Login | Sweety</title>

            <div className="page-container login-container">
                <a href="/home">
                    <img className="logo" src={sweetyLogo} alt="Sweety Logo" />
                </a>

                <div className="login-modal">
                    <div className="login-title">
                        <h2>Login</h2>
                    </div>

                    <form
                        className="login-form"
                        action="POST"
                        onSubmit={handleLogin}
                    >
                        <label htmlFor="">Email</label>
                        <Input
                            icon={faEnvelope}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="">Password</label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="login-options">
                            <div className="login-remember">
                                <input id="rememberMe" type="checkbox" />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>

                            <a href="/password-forgot">Forgot password?</a>
                        </div>

                        <button className="login-button">Sign In</button>
                    </form>

                    <p className="login-no-account">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
