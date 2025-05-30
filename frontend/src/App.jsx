import { createBrowserRouter, RouterProvider, useLocation } from "react-router";

import "./css/App.css";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PasswordForgot from "./pages/PasswordForgot.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/home",
        Component: Home,
    },
    {
        path: "/products",
        Component: Products,
    },
    {
        path: "/about-us",
        Component: AboutUs,
    },
    {
        path: "/contact-us",
        Component: ContactUs,
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/signup",
        Component: Signup,
    },
    {
        path: "/password-forgot",
        Component: PasswordForgot,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
