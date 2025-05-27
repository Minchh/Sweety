import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "../css/NavBar.css";

import sweetyLogo from "../assets/sweety-logo.svg";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="#">
                    <img src={sweetyLogo} alt="Sweety Logo" />
                </a>
            </div>

            <ul className="navbar-links">
                <li>
                    <a href="#" title="Home">Home</a>
                </li>
                <li>
                    <a href="#" title="Products">Products</a>
                </li>
                <li>
                    <a href="#" title="About Us">About Us</a>
                </li>
                <li>
                    <a href="#" title="Contact Us">Contact Us</a>
                </li>
            </ul>

            <ul className="navbar-actions">
                <li>
                    <FontAwesomeIcon icon={faUser} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
