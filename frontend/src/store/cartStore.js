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

    addProductToCart: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/${productId}`);

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

            return response.data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Failed to add product to cart", isLoading: false });
            throw err;
        }
    },
}));
