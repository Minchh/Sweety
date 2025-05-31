import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";

import "../css/pages/Products.css";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useProductsStore } from "../store/productsStore.js";

function Products() {
    const {
        products,
        isLoading,
        error,
        totalCount,
        totalPages,
        currentPage,
        searchTerm,
        selectedCategories,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
        setSearchTerm,
        setSelectedCategories,
        setSortBy,
        setPriceRange,
        setCurrentPage,
        getProducts,
        resetFilters,
        clearError,
    } = useProductsStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState("");
    const [localMinPrice, setLocalMinPrice] = useState(0);
    const [localMaxPrice, setLocalMaxPrice] = useState(12.0);

    const sortByOptions = [
        { label: "Sort by Name (A-Z)", field: "name", order: "asc" },
        { label: "Sort by Name (Z-A)", field: "name", order: "desc" },
        { label: "Sort by Price (Low-High)", field: "price", order: "asc" },
        { label: "Sort by Price (High-Low)", field: "price", order: "desc" },
    ];

    const filters = [
        { id: "All", label: "All" },
        { id: "breads", label: "Breads" },
        { id: "cakes", label: "Cakes" },
        { id: "candies", label: "Candies" },
        { id: "pastries", label: "Pastries" },
    ];

    // Get current sort option for display
    const getCurrentSortOption = () => {
        const option = sortByOptions.find((opt) => opt.field === sortBy && opt.order === sortOrder);
        return option ? option.label : "Sort by Name (A-Z)";
    };

    // Load products on component mount
    useEffect(() => {
        getProducts();
    }, []);

    // Sync local states with store
    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        setLocalMinPrice(minPrice || 0);
        setLocalMaxPrice(maxPrice || 12.0);
    }, [minPrice, maxPrice]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearchTerm !== searchTerm) {
                setSearchTerm(localSearchTerm);
                getProducts();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearchTerm]);

    const handleSliderChange = (value, isMin) => {
        if (isMin) {
            if (value > localMaxPrice) {
                setLocalMinPrice(localMaxPrice);
                setLocalMaxPrice(value);
            } else {
                setLocalMinPrice(value);
            }
        } else {
            if (value < localMinPrice) {
                setLocalMaxPrice(localMinPrice);
                setLocalMinPrice(value);
            } else {
                setLocalMaxPrice(value);
            }
        }
    };

    // Apply price filter when sliders stop moving
    const handlePriceFilterApply = () => {
        setPriceRange(localMinPrice === 0 ? "" : localMinPrice, localMaxPrice === 12.0 ? "" : localMaxPrice);
        getProducts();
    };

    const handleCategoryChange = (category) => {
        let newCategories;

        if (category === "All") {
            newCategories = ["All"];
        } else {
            const isAllSelected = selectedCategories.includes("All");
            const isCategorySelected = selectedCategories.includes(category);

            if (isAllSelected) {
                newCategories = [category];
            } else if (isCategorySelected) {
                newCategories = selectedCategories.filter((c) => c !== category);
                if (newCategories.length === 0) {
                    newCategories = ["All"];
                }
            } else {
                newCategories = [...selectedCategories, category];
            }
        }

        setSelectedCategories(newCategories);
        getProducts();
    };

    const handleSortChange = (option) => {
        setSortBy(option.field, option.order);
        setIsDropdownOpen(false);
        getProducts();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getProducts();
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleAddToCart = (product) => {
        console.log("Added to cart:", product);
        // TODO: Implement your cart logic here
    };

    const handleResetFilters = () => {
        resetFilters();
        setLocalSearchTerm("");
        setLocalMinPrice(0);
        setLocalMaxPrice(12.0);
        getProducts();
    };

    // Calculate display info
    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalCount);

    if (error) {
        return (
            <div className="page-container">
                <NavBar />
                <div className="error-container">
                    <h2>Error loading products</h2>
                    <p>{error}</p>
                    <button
                        onClick={() => {
                            clearError();
                            getProducts();
                        }}
                    >
                        Try Again
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <title>Products | Sweety</title>

            <div className="page-container">
                <NavBar />

                <div className="products-container">
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Search */}
                        <div className="sidebar-section">
                            <div className="search-container">
                                <FontAwesomeIcon className="search-icon" size={16} icon={faSearch} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={localSearchTerm}
                                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="dropdown-container">
                                <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    {getCurrentSortOption()}
                                    <FontAwesomeIcon className="dropdown-icon" size={16} icon={faCaretDown} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        {sortByOptions.map((option) => (
                                            <button
                                                key={option.label}
                                                className={`dropdown-option ${
                                                    getCurrentSortOption() === option.label ? "selected" : ""
                                                }`}
                                                onClick={() => handleSortChange(option)}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Category */}
                        <div className="sidebar-section">
                            <h4 className="section-title">CATEGORY</h4>
                            <div className="category-list">
                                {filters.map((category) => (
                                    <div className="category-group" key={category.id}>
                                        <input
                                            className="category-input"
                                            id={category.id}
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={() => handleCategoryChange(category.id)}
                                        />
                                        <label htmlFor={category.id} className="category-label">
                                            {category.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="sidebar-section">
                            <h4 className="section-title">FILTER BY PRICE</h4>
                            <div className="price-slider-container">
                                <div className="slider-track"></div>
                                <div
                                    className="slider-range"
                                    style={{
                                        left: `${(localMinPrice / 12.0) * 100}%`,
                                        width: `${((localMaxPrice - localMinPrice) / 12.0) * 100}%`,
                                    }}
                                ></div>
                                <input
                                    type="range"
                                    min="0"
                                    max="11.99"
                                    value={localMinPrice}
                                    step="0.01"
                                    className="price-slider"
                                    onChange={(e) => handleSliderChange(parseFloat(e.target.value), true)}
                                    onMouseUp={handlePriceFilterApply}
                                    onTouchEnd={handlePriceFilterApply}
                                />
                                <input
                                    type="range"
                                    min="0.01"
                                    max="12.00"
                                    value={localMaxPrice}
                                    step="0.01"
                                    className="price-slider"
                                    onChange={(e) => handleSliderChange(parseFloat(e.target.value), false)}
                                    onMouseUp={handlePriceFilterApply}
                                    onTouchEnd={handlePriceFilterApply}
                                />
                            </div>
                            <div className="price-display">
                                Price: ${localMinPrice.toFixed(2)} - ${localMaxPrice.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="main-content">
                        {/* Header */}
                        <div className="products-header">
                            <div className="results-info">
                                {isLoading
                                    ? "Loading..."
                                    : `Showing ${
                                          totalCount > 0 ? startIndex + 1 : 0
                                      } - ${endIndex} of ${totalCount} results`}
                            </div>
                            {totalPages > 1 && (
                                <div className="pagination">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                                            onClick={() => handlePageChange(i + 1)}
                                            disabled={isLoading}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Products Grid */}
                        <div className="products-grid">
                            {isLoading ? (
                                <div className="loading-spinner">Loading products...</div>
                            ) : products && products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
                                ))
                            ) : (
                                <div className="no-products">
                                    <h3>No products found</h3>
                                    <p>Try adjusting your filters or search terms.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Products;
