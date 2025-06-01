import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/order";

axios.defaults.withCredentials = true;

export const useOrderStore = create((set, get) => ({
    cartItems: [],
    activeOrder: null,
    totalAmount: 0,
    totalItems: 0,
    isLoading: false,
    error: null,
    message: null,
}));
