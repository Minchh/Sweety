import { useState } from "react";

import "../css/pages/Signup.css";
import sweetyLogo from "../assets/sweety-logo.svg";
import { faEnvelope, faKey, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

import Input from "../components/Input.jsx";

function Signup() {
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <title>Signup | Sweety</title>

            <div className="page-container signup-container">
                <a href="/home">
                    <img className="logo" src={sweetyLogo} alt="Sweety Logo" />
                </a>

                <div className="signup-modal">
                    <div className="signup-title">
                        <h2>Sign Up</h2>
                    </div>

                    <form
                        className="signup-form"
                        action="POST"
                        onSubmit={handleSignUp}
                    >
                        <label htmlFor="">Full Name</label>
                        <Input
                            icon={faUser}
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />

                        <label htmlFor="">Phone Number</label>
                        <Input
                            icon={faPhone}
                            type="phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

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

                        <label htmlFor="">Confirm Password</label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button className="signup-button">Sign Up</button>
                    </form>

                    <p className="signup-account">
                        Already have an account? <a href="/login">Sign In</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Signup;
