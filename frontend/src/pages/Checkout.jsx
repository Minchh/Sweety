import { useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import s from "../css/pages/Checkout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { useProfileStore } from "../store/profileStore.js";
import { useCartStore } from "../store/cartStore.js";

function Checkout() {
    const location = useLocation();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
    });
    const navigate = useNavigate();
    const { getUserProfile, profile } = useProfileStore();
    const { cartItems, getCartItems } = useCartStore();

    if (!location.state?.fromCart) {
        return <Navigate to="/cart" replace />;
    }

    useEffect(() => {
        getUserProfile();
    }, [getUserProfile]);

    useEffect(() => {
        getCartItems();
    }, [getCartItems]);

    useEffect(() => {
        if (profile) {
            const profileData = {
                fullName: profile.fullName || "",
                email: profile.email || "",
                phoneNumber: profile.phoneNumber || "",
                address: profile.address || "",
            };
            setFormData(profileData);
        }
    }, [profile]);

    const subtotal = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

    const handlePlaceOrder = async () => {
        toast.success("Placed order successfully", { style: { fontFamily: "Poppins" } });
        setTimeout(() => {
            navigate("/home");
        }, 1000);
    };

    return (
        <>
            <title>Checkout | Sweety</title>

            <div className="page-container">
                <NavBar />

                <div className={s.checkoutModal}>
                    <div className={s.checkoutTitle}>
                        <h2>DELIVERY INFORMATION</h2>
                    </div>

                    <div className={s.checkoutInfoContainer}>
                        <div className={s.checkoutInfoRow}>
                            <span className={s.checkoutInfoLabel}>Full Name</span>
                            <span className={s.checkoutInfo}>{formData.fullName}</span>
                        </div>

                        <div className={s.checkoutInfoRow}>
                            <span className={s.checkoutInfoLabel}>Email</span>
                            <span className={s.checkoutInfo}>{formData.email}</span>
                        </div>

                        <div className={s.checkoutInfoRow}>
                            <span className={s.checkoutInfoLabel}>Phone Number</span>
                            <span className={s.checkoutInfo}>{formData.phoneNumber}</span>
                        </div>

                        <div className={s.checkoutInfoRow}>
                            <span className={s.checkoutInfoLabel}>Address</span>
                            <span className={s.checkoutInfo}>{formData.address}</span>
                        </div>
                    </div>

                    <div className={s.checkoutTitle}>
                        <h2>ORDER DETAILS</h2>
                    </div>

                    <div className={s.checkoutOrderContainer}>
                        {cartItems.map((cartItem) => (
                            <div className={s.checkoutOrderRow}>
                                <span className={s.checkoutOrderAmount}>
                                    {cartItem.quantity} x {cartItem.product.name}
                                </span>
                                <span className={s.checkoutOrderPrice}>
                                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}

                        <div className={s.checkoutSubtotalRow}>
                            <span className={s.checkoutSubtotalLabel}>Subtotal</span>
                            <span className={s.checkoutSubtotal}>${subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={s.checkoutTitle}>
                        <h2>PAYMENT METHOD</h2>
                    </div>

                    <div className={s.checkoutPaymentContainer}>
                        <div className={s.checkoutPaymentRow}>
                            <span className={s.checkoutPaymentLabel}>Cash on Delivery</span>
                            <span className={s.checkoutPayment}>
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </span>
                        </div>
                    </div>

                    <button type="submit" className={s.checkoutButton} onClick={handlePlaceOrder}>
                        PLACE ORDER
                    </button>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Checkout;
