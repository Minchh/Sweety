import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import s from "../css/components/CartItem.module.css";

function CartItem({ cartItem }) {

    console.log(cartItem);
    
    return (
        <div key={cartItem._id} className={s.cart_item_row}>
            {/* Product */}
            <div className={s.product_container}>
                <div className={s.product_image_container}>
                    <img
                        src={cartItem.product.imageURL}
                        alt={cartItem.product.name}
                        className={s.product_image}
                    />
                </div>
                <span className={s.product_name}>{cartItem.product.name}</span>
            </div>

            {/* Price */}
            <div className={s.product_price}>${cartItem.price.toFixed(2)}</div>

            {/* Quantity Controls */}
            <div className={s.product_quantity_container}>
                <button
                    onClick={() =>
                        handleQuantityChange(
                            cartItem._id,
                            cartItem.quantity,
                            -1
                        )
                    }
                    className={s.product_quantity_button}
                >
                    <FontAwesomeIcon
                        size={16}
                        icon={faMinus}
                        className={s.product_quantity_icon}
                    />
                </button>

                <span className={s.product_quantity}>{cartItem.quantity}</span>

                <button
                    onClick={() =>
                        handleQuantityChange(cartItem._id, cartItem.quantity, 1)
                    }
                    className={s.product_quantity_button}
                >
                    <FontAwesomeIcon
                        size={16}
                        icon={faPlus}
                        className={s.product_quantity_icon}
                    />
                </button>
            </div>

            {/* Subtotal */}
            <div className={s.product_subtotal}>
                ${(cartItem.price * cartItem.quantity).toFixed(2)}
            </div>
        </div>
    );
}

export default CartItem;
