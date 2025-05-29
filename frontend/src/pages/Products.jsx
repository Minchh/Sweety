import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/Products.css";

import NavBar from "../components/NavBar.jsx";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Products() {
    return (
        <>
            <div className="page-container">
                <div className="page-overlay">
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
                            <h4>CATEGORY</h4>
                            <ul className="category-group">
                                <li>
                                    <input type="checkbox" id="product-all" />
                                    <label htmlFor="product-all">All</label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        id="product-breads"
                                    />
                                    <label htmlFor="product-breads">
                                        Breads
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="product-cakes" />
                                    <label htmlFor="product-cakes">Cakes</label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        id="product-candies"
                                    />
                                    <label htmlFor="product-candies">
                                        Candies
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        id="product-pastries"
                                    />
                                    <label htmlFor="product-pastries">
                                        Pastries
                                    </label>
                                </li>
                            </ul>
                        </div>

                        <div className="filter">
                            <h4>FILTER BY PRICE</h4>
                            <input type="range" />
                            <label>Price: </label>
                        </div>
                        <div className="products-list"></div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Products;
