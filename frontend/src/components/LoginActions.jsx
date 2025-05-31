import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "../css/components/LoginActions.css";

import { useAuthStore } from "../store/authStore.js";

function LoginActions() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleUserClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCartClick = () => {
        navigate("/cart");
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        navigate("/profile");
    };

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        logout();
        navigate("/");
    };

    return (
        <ul className="navbar-actions">
            <li className="user-dropdown" ref={dropdownRef}>
                <FontAwesomeIcon
                    icon={faUser}
                    onClick={handleUserClick}
                    className="user-icon"
                />
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <button
                            onClick={handleProfileClick}
                            className="dropdown-item"
                        >
                            Profile
                        </button>
                        <button
                            onClick={handleLogoutClick}
                            className="dropdown-item"
                        >
                            Log out
                        </button>
                    </div>
                )}
            </li>
            <li>
                <FontAwesomeIcon
                    icon={faShoppingCart}
                    onClick={handleCartClick}
                    className="cart-icon"
                />
            </li>
        </ul>
    );
}

export default LoginActions;
