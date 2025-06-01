import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/cart";

axios.defaults.withCredentials = true;

export const useCartStore = create((set, get) => ({
    cartItems: [],
    activeOrder: null,
    totalAmount: 0,
    totalItems: 0,
    isLoading: false,
    error: null,
    message: null,

    clearError: () => set({ error: null }),
    clearMessages: () => set({ error: null, message: null }),

    getCartItems: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/`);

            const totalAmount = response.data.data.cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
            const totalItems = response.data.data.cartItems.reduce((total, item) => total + item.quantity, 0);

            set({
                cartItems: response.data.data.cartItems || [],
                totalAmount: totalAmount,
                totalItems: totalItems,
                isLoading: false,
            });
        } catch (err) {
            if (err.response?.status === 404) {
                set({
                    cartItems: [],
                    activeOrder: null,
                    totalAmount: 0,
                    totalItems: 0,
                    isLoading: false,
                });
            } else {
                set({
                    error: err.response?.data?.message || "Failed to fetch cart items",
                    isLoading: false,
                });
                throw err;
            }
        }
    },

    addProductToCart: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/${productId}`);

            if (response.data.status === "success") {
                const newCartItem = response.data.data.cartItem;

                set((state) => ({
                    cartItems: [...state.cartItems, newCartItem],
                    totalAmount: state.totalAmount + newCartItem.price,
                    activeOrder: {
                        ...state.activeOrder,
                        totalAmount: state.totalAmount + newCartItem.price,
                        amount: state.totalAmount + newCartItem.price,
                        cartItems: [...state.cartItems, newCartItem],
                    },
                    isLoading: false,
                }));
            }

            return response.data;
        } catch (err) {
            if (err.response.data.code === 409) {
                return err.response.data;
            } else {
                set({ error: err.response?.data?.message || "Failed to add product to cart", isLoading: false });
                throw err;
            }
        }
    },

    increaseProductQuantity: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/increase/${productId}`);

            set((state) => ({
                cartItems: state.cartItems.map((item) =>
                    item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
                ),
                isLoading: false,
            }));

            return response.data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Error increasing product quantity", isLoading: false });
            throw err;
        }
    },

    decreaseProductQuantity: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/decrease/${productId}`);

            set((state) => ({
                cartItems: state.cartItems.map((item) =>
                    item.product._id === productId ? { ...item, quantity: item.quantity - 1 } : item
                ),
                isLoading: false,
            }));

            return response.data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Error increasing product quantity", isLoading: false });
            throw err;
        }
    },

    deleteProductFromCart: async (cartItemId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(`${API_URL}/${cartItemId}`);

            set((state) => ({
                cartItems: state.cartItems.filter((item) => item.id !== cartItemId),
                isLoading: false,
            }));

            return response.data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Error deleting product from cart", isLoading: false });
            throw err;
        }
    },
}));
