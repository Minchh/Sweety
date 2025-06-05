import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/products";

axios.defaults.withCredentials = true;

export const useProductsStore = create((set, get) => ({
    products: null,
    error: null,
    isLoading: false,
    message: null,

    searchTerm: "",
    selectedCategories: ["All"],
    sortBy: "name",
    sortOrder: "asc", // "asc", "desc"
    minPrice: "",
    maxPrice: "",
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,

    clearError: () => set({ error: null }),

    clearMessages: () => set({ error: null, message: null }),

    setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),

    setSelectedCategories: (categories) =>
        set({
            selectedCategories: categories,
            currentPage: 1,
        }),

    setSortBy: (field, order = "asc") =>
        set({
            sortBy: field,
            sortOrder: order,
            currentPage: 1,
        }),

    setPriceRange: (min, max) =>
        set({
            minPrice: min,
            maxPrice: max,
            currentPage: 1,
        }),

    setCurrentPage: (page) => set({ currentPage: page }),

    buildQueryParams: () => {
        const state = get();
        const params = new URLSearchParams();

        // Search
        if (state.searchTerm.trim()) {
            params.append("search", state.searchTerm.trim());
        }

        // Categories
        if (state.selectedCategories.length > 0 && !state.selectedCategories.includes("All")) {
            if (state.selectedCategories.length === 1) {
                params.append("category", state.selectedCategories[0]);
            } else {
                state.selectedCategories.forEach((category) => {
                    params.append("category", category);
                });
            }
        }

        // Sort
        if (state.sortBy) {
            const sortValue = state.sortOrder === "desc" ? -1 : 1;
            params.append(`sort[${state.sortBy}]`, sortValue);
        }

        // Price range
        if (state.minPrice !== "" && state.minPrice !== null && state.minPrice !== undefined) {
            params.append("price[gte]", state.minPrice);
        }
        if (state.maxPrice !== "" && state.maxPrice !== null && state.maxPrice !== undefined) {
            params.append("price[lte]", state.maxPrice);
        }

        // Pagination
        params.append("page", state.currentPage);
        params.append("limit", 12);

        return params.toString();
    },

    // Get products with filters
    getProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const queryString = get().buildQueryParams();
            const response = await axios.get(`${API_URL}/?${queryString}`);

            set({
                products: response.data.data.products,
                totalCount: response.data.totalCount || 0,
                totalPages: response.data.totalPages || 1,
                currentPage: response.data.currentPage || 1,
                isLoading: false,
                error: null,
            });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Error getting products",
                isLoading: false,
            });
            throw err;
        }
    },

    // Create new product (Admin)
    createNewProduct: async (name, price, category, imageName, available, stock) => {
        set({ isLoading: true, error: null });
        try {
            const productData = {
                name,
                price,
                category,
                imageName,
                available,
                stock,
            };

            const response = await axios.post(`${API_URL}/`, productData);

            await get().getProducts();

            set({
                isLoading: false,
                error: null,
                message: "Product created successfully",
            });

            return response.data.data.newProduct;
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error creating product";
            set({
                error: errorMessage,
                isLoading: false,
            });
            throw err;
        }
    },

    searchProducts: async (term) => {
        set({ searchTerm: term, currentPage: 1 });
        await get().getProducts();
    },

    filterByCategory: async (categories) => {
        set({ selectedCategories: categories, currentPage: 1 });
        await get().getProducts();
    },

    sortProducts: async (field, order = "asc") => {
        set({ sortBy: field, sortOrder: order, currentPage: 1 });
        await get().getProducts();
    },

    filterByPriceRange: async (min, max) => {
        set({ minPrice: min, maxPrice: max, currentPage: 1 });
        await get().getProducts();
    },

    goToPage: async (page) => {
        set({ currentPage: page });
        await get().getProducts();
    },

    applyFilters: async () => {
        await get().getProducts();
    },
}));
