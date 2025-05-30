import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import "../css/pages/EmailVerification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useAuthStore } from "../store/authStore.js";

function EmailVerification() {
    const [code, setCode] = useState(["", "", "", "", "", "", ""]);
    const [isComplete, setIsComplete] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const { verifyEmail, error, isLoading, clearError } = useAuthStore();

    useEffect(() => {
        setIsComplete(code.every((digit) => digit !== ""));
    }, [code]);

    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleChange = (index, value) => {
        if (error) clearError();

        // Only allow single digits
        if (value.length > 1) return;

        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 6) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === "Backspace") {
            if (!code[index] && index > 0) {
                // If current input is empty, focus previous input
                inputRefs.current[index - 1]?.focus();
            }
        }
        // Handle arrow keys
        else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 6) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        if (error) clearError();

        const pastedData = e.clipboardData.getData("text").slice(0, 7);

        if (!/^\d+$/.test(pastedData)) return;

        const newCode = [...code];
        for (let i = 0; i < Math.min(pastedData.length, 7); i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);

        // Focus the next empty input or the last input
        const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
        const focusIndex =
            nextEmptyIndex === -1 ? 6 : Math.min(nextEmptyIndex, 6);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleVerify = async () => {
        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/home");
            toast.success("Email verified successfully");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="page-container email-container">
            <div className="card">
                <h2 className="title">Verify Your Email</h2>
                <p className="subtitle">
                    Enter the 6-digit code sent to your email address
                </p>

                <div className="input-container">
                    {code.map((digit, index) => (
                        <input
                            className="input"
                            style={{
                                borderColor: digit ? "#ebc6a8" : "#4b5563",
                                backgroundColor: digit
                                    ? "rgba(8, 9, 11, 0.3)"
                                    : "transparent",
                            }}
                            type="text"
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={digit}
                            onChange={(e) =>
                                handleChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            maxLength={1}
                            autoComplete="off"
                        />
                    ))}
                </div>

                {error && <p className="error-message">{error}</p>}

                <button
                    onClick={handleVerify}
                    disabled={!isComplete}
                    className="verify-button"
                    style={{
                        backgroundColor: isComplete ? "#ebc6a8" : "#374151",
                        cursor: isComplete ? "pointer" : "not-allowed",
                        opacity: isComplete ? 1 : 0.6,
                    }}
                >
                    {isLoading ? (
                        <FontAwesomeIcon className="loading" icon={faSpinner} />
                    ) : (
                        "Verify Email"
                    )}
                </button>
            </div>
        </div>
    );
}

export default EmailVerification;
