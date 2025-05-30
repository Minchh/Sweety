import { useState } from "react";

import "../css/pages/PasswordForgot.css";
import sweetyLogo from "../assets/sweety-logo.svg";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import Input from "../components/Input.jsx";

function PasswordForgot() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordForgot = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <title>Forgot Password | Sweety</title>

            <div className="page-container password-forgot-container">
                <a href="/home">
                    <img className="logo" src={sweetyLogo} alt="Sweety Logo" />
                </a>

                <div className="password-forgot-modal">
                    <div className="password-forgot-title">
                        <h2>Forgot Password</h2>
                    </div>

                    <form
                        className="password-forgot-form"
                        action="POST"
                        onSubmit={handlePasswordForgot}
                    >
                        <label htmlFor="">Email</label>
                        <Input
                            icon={faEnvelope}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="">New Password</label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label htmlFor="">Confirm New Password</label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="password-forgot-button"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PasswordForgot;
