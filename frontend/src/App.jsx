import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

import "./css/App.css";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PasswordForgot from "./pages/PasswordForgot.jsx";
import EmailVerification from "./pages/EmailVerification";
import { useAuthStore } from "./store/authStore.js";
import PasswordReset from "./pages/PasswordReset.jsx";

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

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

    console.log("Is Authenticated: ", isAuthenticated);
    console.log("User: ", user);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
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
                <Route
                    path="/email-verification"
                    element={<EmailVerification />}
                />
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
