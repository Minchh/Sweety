import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

import "./css/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PasswordForgot from "./pages/PasswordForgot.jsx";
import EmailVerification from "./pages/EmailVerification";
import PasswordReset from "./pages/PasswordReset.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import { useAuthStore } from "./store/authStore.js";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return (
            <div className="page-container">
                <div className="loading-layout">
                    <FontAwesomeIcon className="loading-layout-icon" icon={faSpinner} />
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !user.isVerified) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return (
            <div className="page-container">
                <div className="loading-layout">
                    <FontAwesomeIcon className="loading-layout-icon" icon={faSpinner} />
                </div>
            </div>
        );
    }

    if (isAuthenticated && user.isVerified) {
        return <Navigate to={"/home"} replace />;
    }

    return children;
};

function App() {
    const { checkAuth, isCheckingAuth, isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RedirectAuthenticatedUser>
                            <Login />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <RedirectAuthenticatedUser>
                            <Signup />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route path="/password-forgot" element={<PasswordForgot />} />
                <Route path="/email-verification" element={<EmailVerification />} />
                <Route
                    path="/password-reset/:token"
                    element={
                        <RedirectAuthenticatedUser>
                            <PasswordReset />
                        </RedirectAuthenticatedUser>
                    }
                />
            </Routes>
            <Toaster
                toastOptions={{
                    style: {
                        fontFamily: "Poppins",
                    },
                }}
            />
        </>
    );
}

export default App;
