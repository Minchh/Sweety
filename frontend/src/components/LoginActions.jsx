import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "../css/LoginActions.css";

function LoginActions() {
    return (
        <ul className="navbar-actions">
            <li>
                <FontAwesomeIcon icon={faUser} />
            </li>
            <li>
                <FontAwesomeIcon icon={faShoppingCart} />
            </li>
        </ul>
    );
}

export default LoginActions;
