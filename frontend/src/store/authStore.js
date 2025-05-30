import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    clearError: () => set({ error: null }),

    clearMessages: () => set({ error: null, message: null }),

    signup: async (fullName, phoneNumber, email, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                fullName,
                phoneNumber,
                email,
                password,
                confirmPassword,
            });
            set({
                user: response.data.data.user,
                isAuthenticated: true,
                isLoading: false,
                message:
                    "Account created successfully! Please check your email for verification.",
            });
        } catch (err) {
            set({
                error: err.response.data.message || "Error signing up",
                isLoading: false,
            });
            throw err;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/email-verification`, {
                code,
            });
            set({
                user: response.data.data.user,
                isAuthenticated: true,
                isLoading: false,
            });
            return response.data;
        } catch (err) {
            set({
                error: err.response.data.message || "Error verifying email",
                isLoading: false,
            });
            throw err;
        }
    },
}));
