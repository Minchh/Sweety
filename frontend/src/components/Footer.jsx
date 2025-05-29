import "../css/components/Footer.css";
import sweetyLogo from "../assets/sweety-logo.svg";

function Footer() {
    return (
        <footer>
            <div className="navbar-brand">
                <img src={sweetyLogo} alt="Sweety Logo" />
            </div>
            <div className="copyright">
                <p>Copyright &copy; 2025 <strong>Sweety</strong>. All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
