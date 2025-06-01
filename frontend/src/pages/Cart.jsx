import { useEffect } from "react";

import s from "../css/pages/Cart.module.css";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import { useCartStore } from "../store/cartStore.js";
import CartItem from "../components/CartItem.jsx";

function Cart() {
    const { cartItems, getCartItems } = useCartStore();

    const subtotal = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

    useEffect(() => {
        getCartItems();
    }, [getCartItems]);

    return (
        <>
            <title>Cart | Sweety</title>

            <div className="page-container">
                <NavBar />

                <div className={s.cart_container}>
                    {cartItems.length !== 0 ? (
                        <>
                            <div className={s.cart_header}>
                                <div className={`${s.header_cell}`}>Product</div>
                                <div className={`${s.header_cell}`}>Price</div>
                                <div className={`${s.header_cell}`}>Quantity</div>
                                <div className={`${s.header_cell}`}>Subtotal</div>
                            </div>

                            <div className={s.cart_items}>
                                {cartItems.map((cartItem) => (
                                    <CartItem key={cartItem._id} cartItem={cartItem} />
                                ))}
                            </div>

                            <div className={s.cart_actions_container}>
                                <button className={s.cart_update_button}>UPDATE CART</button>

                                <p className={s.cart_subtotal_label}>Subtotal:</p>
                                <p className={s.cart_subtotal}>${subtotal.toFixed(2)}</p>

                                <button className={s.cart_checkout_button}>PROCEED TO CHECKOUT</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={s.empty_cart}>
                                <h3>Your cart is empty</h3>
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
