import { create } from "zustand";
import axios from "axios";

import { useCartStore } from "./cartStore.js";

const API_URL = "http://localhost:3000/api/v1/order";

axios.defaults.withCredentials = true;

export const useOrderStore = create((set, get) => ({
    isLoading: false,
    error: null,
    message: null,

    placeTheOrder: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/`);

            const activeOrder = response.data.data.activeOrder;
            const newOrder = response.data.data.newOrder;

            set({
                isLoading: false,
            });

            const { handleOrderPlaced } = useCartStore.getState();
            handleOrderPlaced(newOrder);

            return response.data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Error placing data", isLoading: false });
            throw err;
        }
    },
}));
