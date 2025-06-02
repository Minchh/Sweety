import { useState, useEffect } from "react";

import s from "../css/pages/TrackOrder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faTruck,
    faCheckCircle,
    faClock,
    faMapMarkerAlt,
    faEye,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

function TrackOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Mock data for demonstration - all "placed" orders
    const mockOrders = [
        {
            _id: "order1",
            trackingId: "ORD-12345-ABCD",
            orderStatus: "placed",
            orderDescription: "Chocolate Deluxe Package",
            amount: 2,
            totalAmount: 89.99,
            discount: 10.0,
            address: "123 Sweet Street, Ho Chi Minh City",
            createdAt: "2025-05-28T10:30:00Z",
            updatedAt: "2025-05-28T15:45:00Z",
            cartItems: [
                {
                    product: { name: "Dark Chocolate Truffles", price: 25.99 },
                    quantity: 2,
                    price: 25.99,
                },
                {
                    product: { name: "Milk Chocolate Box", price: 38.01 },
                    quantity: 1,
                    price: 38.01,
                },
            ],
        },
        {
            _id: "order2",
            trackingId: "ORD-67890-EFGH",
            orderStatus: "placed",
            orderDescription: "Sweet Treats Collection",
            amount: 3,
            totalAmount: 124.5,
            discount: 15.0,
            address: "456 Dessert Avenue, Ho Chi Minh City",
            createdAt: "2025-05-29T14:20:00Z",
            updatedAt: "2025-05-29T16:30:00Z",
            cartItems: [
                {
                    product: { name: "White Chocolate Hearts", price: 32.99 },
                    quantity: 2,
                    price: 32.99,
                },
                {
                    product: { name: "Caramel Bonbons", price: 28.5 },
                    quantity: 1,
                    price: 28.5,
                },
                {
                    product: { name: "Truffle Assortment", price: 45.51 },
                    quantity: 1,
                    price: 45.51,
                },
            ],
        },
        {
            _id: "order3",
            trackingId: "ORD-11111-WXYZ",
            orderStatus: "placed",
            orderDescription: "Premium Chocolate Box",
            amount: 1,
            totalAmount: 65.0,
            discount: 5.0,
            address: "789 Sugar Lane, Ho Chi Minh City",
            createdAt: "2025-06-01T09:15:00Z",
            updatedAt: "2025-06-01T11:22:00Z",
            cartItems: [
                {
                    product: { name: "Artisan Chocolate Collection", price: 70.0 },
                    quantity: 1,
                    price: 70.0,
                },
            ],
        },
    ];

    useEffect(() => {
        // Simulate API call to fetch placed orders
        setTimeout(() => {
            setOrders(mockOrders);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusIcon = (status) => {
        const iconProps = { size: 20, className: "text-amber-400" };

        switch (status) {
            case "pending":
                return <FontAwesomeIcon icon={faClock} {...iconProps} />;
            case "placed":
                return <FontAwesomeIcon icon={faCheckCircle} {...iconProps} />;
            case "shipped":
                return <FontAwesomeIcon icon={faTruck} {...iconProps} />;
            case "delivered":
                return <FontAwesomeIcon icon={faBox} {...iconProps} />;
            default:
                return <FontAwesomeIcon icon={faClock} {...iconProps} />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(selectedOrder?._id === order._id ? null : order);
    };

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading-layout">
                    <FontAwesomeIcon className="loading-layout-icon" icon={faSpinner} />
                </div>
            </div>
        );
    }

    return (
        <>
            <title>Track Order | Sweety</title>

            <div className="page-container">
                <NavBar />

                <div className={s.orderTrackContainer}>
                    {/* Header */}
                    <div className={s.orderTrackHeader}>
                        <h1>Your Orders</h1>
                        <p>Track all your placed orders</p>
                    </div>

                    {/* Orders List */}
                    <div className={s.orderTrackList}>
                        {orders.length === 0 ? (
                            <div className={s.orderTrackNotFoundContainer}>
                                <FontAwesomeIcon icon={faBox} size="3x" className={s.boxIcon} />
                                <h3>No Orders Found</h3>
                                <p>You don't have any placed orders yet.</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order._id} className={s.orderTrackCard}>
                                    {/* Order Summary */}
                                    <div className={s.orderTrackSummary}>
                                        <div className={s.orderTrackSummaryWrapper}>
                                            <div className={s.orderTrackStatusContainer}>
                                                <div className={s.orderTrackStatus}>
                                                    {getStatusIcon(order.orderStatus)}
                                                    <span>{order.orderStatus}</span>
                                                </div>
                                                <div className={s.orderTrackLine}></div>
                                                <span className={s.orderTrackId}>{order.trackingId}</span>
                                            </div>

                                            <button
                                                onClick={() => handleViewDetails(order)}
                                                className={s.orderTrackDetailsButton}
                                            >
                                                <FontAwesomeIcon className={s.eyeIcon} icon={faEye} size="sm" />
                                                <span>
                                                    {selectedOrder?._id === order._id ? "Hide Details" : "View Details"}
                                                </span>
                                            </button>
                                        </div>

                                        <div className={s.orderTrackInfo}>
                                            <div>
                                                <p className={s.orderTrackInfoLabel}>Order Date</p>
                                                <p className={s.orderTrackInfoValue}>{formatDate(order.createdAt)}</p>
                                            </div>

                                            <div>
                                                <p className={s.orderTrackInfoLabel}>Items</p>
                                                <p className={s.orderTrackInfoValue}>
                                                    {order.amount} item{order.amount !== 1 ? "s" : ""}
                                                </p>
                                            </div>

                                            <div>
                                                <p className={s.orderTrackInfoLabel}>Total Amount</p>
                                                <p className={s.orderTrackInfoValue}>${order.totalAmount.toFixed(2)}</p>
                                            </div>

                                            <div>
                                                <p className={s.orderTrackInfoLabel}>Delivery Address</p>
                                                <p className={s.orderTrackInfoValue}>{order.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Details (Expandable) */}
                                    {selectedOrder?._id === order._id && (
                                        <div className={s.orderTrackOrderDetailsContainer}>
                                            <div className={s.orderTrackOrderDetailsWrapper}>
                                                {/* Order Items */}
                                                <div>
                                                    <h4 className={s.orderItemsTitle}>Order Items</h4>
                                                    <div className={s.orderItemsList}>
                                                        {order.cartItems.map((item, index) => (
                                                            <div key={index} className={s.orderItemCard}>
                                                                <div className={s.orderItemLeft}>
                                                                    <div className={s.orderItemImageContainer}>
                                                                        <img src="asdsad" alt="" />
                                                                    </div>
                                                                    <div>
                                                                        <h5 className={s.orderItemName}>
                                                                            {item.product.name}
                                                                        </h5>
                                                                        <p className={s.orderItemQuantity}>
                                                                            Quantity: {item.quantity}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className={s.orderItemPriceContainer}>
                                                                    <p className={s.orderItemTotalPrice}>
                                                                        ${(item.price * item.quantity).toFixed(2)}
                                                                    </p>
                                                                    <p className={s.orderItemUnitPrice}>
                                                                        ${item.price.toFixed(2)} each
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default TrackOrder;
