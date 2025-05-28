import "../css/NavBar.css";

import sweetyLogo from "../assets/sweety-logo.svg";
import Links from "./Links.jsx";
import DefaultActions from "./DefaultActions.jsx";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/home">
                    <img src={sweetyLogo} alt="Sweety Logo" />
                </a>
            </div>

            <Links />

            {/* TODO: Render based on the user is authenticated or not? */}
            <DefaultActions />
        </nav>
    );
}

export default NavBar;
