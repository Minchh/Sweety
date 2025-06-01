import { useEffect } from "react";
import { useNavigate } from "react-router";

import s from "../css/pages/Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import { useCartStore } from "../store/cartStore.js";
import CartItem from "../components/CartItem.jsx";

function Cart() {
    const { cartItems, getCartItems, isLoading } = useCartStore();

    const subtotal = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

    useEffect(() => {
        getCartItems();
    }, [getCartItems]);

    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate("/products");
    };

    return (
        <>
            <title>Cart | Sweety</title>

            <div className="page-container">
                <NavBar />

                <div className={s.cart_container}>
                    {isLoading ? (
                        <div className={s.loading}>
                            <FontAwesomeIcon className={s.loading_icon} icon={faSpinner} />
                        </div>
                    ) : cartItems.length !== 0 ? (
                        <>
                            <div className={s.cart_header}>
                                <div className={`${s.header_cell}`}>Product</div>
                                <div className={`${s.header_cell}`}>Price</div>
                                <div className={`${s.header_cell}`}>Quantity</div>
                                <div className={`${s.header_cell}`}>Subtotal</div>
                            </div>

                            <ul className={s.cart_items}>
                                {cartItems.map((cartItem) => (
                                    <li key={cartItem.id}>
                                        <CartItem cartItem={cartItem} />
                                    </li>
                                ))}
                            </ul>

                            <div className={s.cart_actions_container}>
                                <button className={s.cart_shopping_button} onClick={handleContinueShopping}>
                                    Continue Shopping
                                </button>

                                <p className={s.cart_subtotal_label}>Subtotal:</p>
                                <p className={s.cart_subtotal}>${subtotal.toFixed(2)}</p>

                                <button className={s.cart_checkout_button}>PROCEED TO CHECKOUT</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={s.empty_cart}>
                                <h3>Your cart is currently empty</h3>
                                <p>Add some delicious desserts to get started!</p>
                            </div>
                        </>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Cart;
