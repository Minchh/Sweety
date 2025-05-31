import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/cart";

axios.defaults.withCredentials = true;

export const useProductsStore = create((set, get) => ({
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
            
        } catch (err) {
            
        }
    }
}));
