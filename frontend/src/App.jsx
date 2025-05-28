import { createBrowserRouter, RouterProvider, useLocation } from "react-router";

import "./css/App.css";

import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/home",
        Component: Home,
    }
]);

function App() {

    return (
        <div className="page-container">
            <div className="page-overlay">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
