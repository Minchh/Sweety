import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";

import "../css/pages/Products.css";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";

// Sample product data
const productsData = [
    {
        id: 1,
        name: "Tiramisu",
        price: 7.7,
        image: "/products/product-tiramisu.png",
        category: "cakes",
    },
    {
        id: 2,
        name: "Black Forest",
        price: 11.54,
        image: "/products/product-blackforest.png",
        category: "cakes",
    },
    {
        id: 3,
        name: "Cheesecake",
        price: 9.62,
        image: "/products/product-cheesecake.png",
        category: "cakes",
    },
    {
        id: 4,
        name: "Croissant",
        price: 2.21,
        image: "/products/product-croissant.png",
        category: "breads",
    },
    {
        id: 5,
        name: "Tiramisu",
        price: 7.7,
        image: "/products/product-tiramisu.png",
        category: "cakes",
    },
    {
        id: 6,
        name: "Black Forest",
        price: 11.54,
        image: "/products/product-blackforest.png",
        category: "cakes",
    },
    {
        id: 7,
        name: "Cheesecake",
        price: 9.62,
        image: "/products/product-cheesecake.png",
        category: "cakes",
    },
    {
        id: 8,
        name: "Croissant",
        price: 2.21,
        image: "/products/product-croissant.png",
        category: "breads",
    },
    {
        id: 9,
        name: "Tiramisu",
        price: 7.7,
        image: "/products/product-tiramisu.png",
        category: "cakes",
    },
    {
        id: 10,
        name: "Black Forest",
        price: 11.54,
        image: "/products/product-blackforest.png",
        category: "cakes",
    },
    {
        id: 11,
        name: "Cheesecake",
        price: 9.62,
        image: "/products/product-cheesecake.png",
        category: "cakes",
    },
    {
        id: 12,
        name: "Croissant",
        price: 2.21,
        image: "/products/product-croissant.png",
        category: "breads",
    },
    {
        id: 13,
        name: "Tiramisu",
        price: 7.7,
        image: "/products/product-tiramisu.png",
        category: "cakes",
    },
    {
        id: 14,
        name: "Black Forest",
        price: 11.54,
        image: "/products/product-blackforest.png",
        category: "cakes",
    },
    {
        id: 15,
        name: "Cheesecake",
        price: 9.62,
        image: "/products/product-cheesecake.png",
        category: "cakes",
    },
    {
        id: 16,
        name: "Croissant",
        price: 2.21,
        image: "/products/product-croissant.png",
        category: "breads",
    },
];

function Products() {
    const sortByOptions = ["Sort by Name", "Sort by Price"];
    const filters = [
        { id: "all", label: "All" },
        { id: "breads", label: "Breads" },
        { id: "cakes", label: "Cakes" },
        { id: "candies", label: "Candies" },
        { id: "pastries", label: "Pastries" },
    ];

    // Filter states
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(12.0);
    const [selectedCategories, setSelectedCategories] = useState(["all"]);
    const [searchTerm, setSearchTerm] = useState("");

    // Sort states
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sortOption, setSortOption] = useState("Sort by Name");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const handleSliderChange = (value, isMin) => {
        if (isMin) {
            if (value > maxPrice) {
                setMinPrice(maxPrice);
                setMaxPrice(value);
            } else {
                setMinPrice(value);
            }
        } else {
            if (value < minPrice) {
                setMaxPrice(minPrice);
                setMinPrice(value);
            } else {
                setMaxPrice(value);
            }
        }
    };

    const handleCategoryChange = (category) => {
        if (category === "all") {
            setSelectedCategories(["all"]);
        } else {
            const newCategories = selectedCategories.includes("all")
                ? [category]
                : selectedCategories.includes(category)
                ? selectedCategories.filter((c) => c !== category)
                : [...selectedCategories.filter((c) => c !== "all"), category];

            setSelectedCategories(
                newCategories.length === 0 ? ["all"] : newCategories
            );
        }
    };

    const handleAddToCart = (product) => {
        console.log("Added to cart:", product);
        // TODO: Implement your cart logic here
    };

    // Filter and sort products
    const filteredProducts = productsData.filter((product) => {
        const matchesPrice =
            product.price >= minPrice && product.price <= maxPrice;
        const matchesCategory =
            selectedCategories.includes("all") ||
            selectedCategories.includes(product.category);
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesPrice && matchesCategory && matchesSearch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "Sort by Price") {
            return a.price - b.price;
        }
        return a.name.localeCompare(b.name);
    });

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = sortedProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <>
            <title>Products | Sweety </title>

            <div className="page-container">
                <NavBar />

                <div className="products-container">
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Search */}
                        <div className="sidebar-section">
                            <div className="search-container">
                                <FontAwesomeIcon
                                    className="search-icon"
                                    size={16}
                                    icon={faSearch}
                                />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                            <div className="dropdown-container">
                                <button
                                    className="dropdown-button"
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                >
                                    {sortOption}
                                    <FontAwesomeIcon
                                        className="dropdown-icon"
                                        size={16}
                                        icon={faCaretDown}
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        {sortByOptions.map((option) => (
                                            <button
                                                key={option}
                                                className={`dropdown-option ${
                                                    sortOption === option
                                                        ? "selected"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    setSortOption(option);
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                {option}
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
                                    <div
                                        className="category-group"
                                        key={category.id}
                                    >
                                        <input
                                            className="category-input"
                                            id={`${category.id}`}
                                            type="checkbox"
                                            checked={selectedCategories.includes(
                                                category.id
                                            )}
                                            onChange={() =>
                                                handleCategoryChange(
                                                    category.id
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={`${category.id}`}
                                            className="category-label"
                                        >
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
                                        left: `${(minPrice / 12.0) * 100}%`,
                                        width: `${
                                            ((maxPrice - minPrice) / 12.0) * 100
                                        }%`,
                                    }}
                                ></div>
                                <input
                                    type="range"
                                    min="0"
                                    max="11.99"
                                    value={minPrice}
                                    step="0.01"
                                    className="price-slider"
                                    onChange={(e) =>
                                        handleSliderChange(
                                            parseFloat(e.target.value),
                                            true
                                        )
                                    }
                                />
                                <input
                                    type="range"
                                    min="0.01"
                                    max="12.00"
                                    value={maxPrice}
                                    step="0.01"
                                    className="price-slider"
                                    onChange={(e) =>
                                        handleSliderChange(
                                            parseFloat(e.target.value),
                                            false
                                        )
                                    }
                                />
                            </div>
                            <div className="price-display">
                                Price: ${minPrice.toFixed(2)} - $
                                {maxPrice.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="main-content">
                        {/* Header */}
                        <div className="products-header">
                            <div className="results-info">
                                Showing {startIndex + 1} -{" "}
                                {Math.min(
                                    startIndex + itemsPerPage,
                                    sortedProducts.length
                                )}{" "}
                                of {sortedProducts.length} results
                            </div>
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`page-btn ${
                                            currentPage === i + 1
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="products-grid">
                            {displayedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Products;
