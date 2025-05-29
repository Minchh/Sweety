import { createBrowserRouter, RouterProvider, useLocation } from "react-router";

import "./css/App.css";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";

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
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
