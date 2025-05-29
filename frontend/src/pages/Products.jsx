import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "../css/pages/Products.css";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

function Products() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(12.0);

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

    return (
        <>
            <title>Products | Sweety </title>

            <div className="page-container">
                <NavBar />

                <section className="products">
                    <div className="search">
                        <div className="search-group">
                            <div className="search-container">
                                <FontAwesomeIcon icon={faSearch} />
                                <input type="search" placeholder="Search" />
                            </div>
                            <div className="sort-container">
                                <input
                                    type="search"
                                    placeholder="Sort by Name"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="category">
                        <h4 className="category-title">CATEGORY</h4>
                        <ul className="category-group">
                            <li>
                                <input type="checkbox" id="product-all" />
                                <label htmlFor="product-all">All</label>
                            </li>
                            <li>
                                <input type="checkbox" id="product-breads" />
                                <label htmlFor="product-breads">Breads</label>
                            </li>
                            <li>
                                <input type="checkbox" id="product-cakes" />
                                <label htmlFor="product-cakes">Cakes</label>
                            </li>
                            <li>
                                <input type="checkbox" id="product-candies" />
                                <label htmlFor="product-candies">Candies</label>
                            </li>
                            <li>
                                <input type="checkbox" id="product-pastries" />
                                <label htmlFor="product-pastries">
                                    Pastries
                                </label>
                            </li>
                        </ul>
                    </div>

                    <div className="filter">
                        <h4 className="filter-title">FILTER BY PRICE</h4>

                        <div class="slider-container">
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
                                max="11.53"
                                value={minPrice}
                                step="0.01"
                                className="slider"
                                onChange={(e) =>
                                    handleSliderChange(
                                        parseFloat(e.target.value),
                                        true
                                    )
                                }
                            />
                            <input
                                type="range"
                                min="0"
                                max="11.53"
                                value={maxPrice}
                                step="0.01"
                                className="slider"
                                onChange={(e) =>
                                    handleSliderChange(
                                        parseFloat(e.target.value),
                                        false
                                    )
                                }
                            />
                        </div>

                        <div class="price-display">
                            Price: ${minPrice.toFixed(2)} - $
                            {maxPrice.toFixed(2)}
                        </div>
                    </div>

                    <div className="products-list">
                        <div className="products-header">
                            <div className="show-result">
                                <p>Showing 1 - 12 of 25 results</p>
                            </div>

                            <div className="pages">
                                <button>1</button>
                                <button>2</button>
                                <button>3</button>
                            </div>
                        </div>

                        <div className="list"></div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}

export default Products;
