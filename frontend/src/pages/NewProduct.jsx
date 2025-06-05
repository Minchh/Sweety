import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import styles from "../css/pages/NewProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faDollarSign, faImage, faList, faBoxes, faSpinner } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import { useProductsStore } from "../store/productsStore.js";

function NewProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [available, setAvailable] = useState(true);
    const [nameError, setNameError] = useState("");
    const [priceError, setPriceError] = useState("");

    const { createNewProduct, error, isLoading, clearError } = useProductsStore();

    const navigate = useNavigate();

    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleInputChange = (setter) => (e) => {
        if (error) clearError();
        setter(e.target.value);
    };

    const handleImageChange = (e) => {
        if (error) clearError();
        const file = e.target.files[0];
        if (file) {
            // Store just the filename with extension
            setImage(file.name);
        } else {
            setImage("");
        }
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        if (error) clearError();
        setName(newName);
        if (nameError) setNameError("");
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        if (error) clearError();
        setPrice(newPrice);
        if (priceError) setPriceError("");
    };

    const handleCategoryChange = (e) => {
        if (error) clearError();
        setCategory(e.target.value);
    };

    const handleAvailableChange = (e) => {
        if (error) clearError();
        setAvailable(e.target.checked);
    };

    const validateForm = () => {
        let isValid = true;

        if (!name.trim()) {
            setNameError("Product name is required");
            isValid = false;
        } else if (name.length < 2) {
            setNameError("Product name must be at least 2 characters long");
            isValid = false;
        } else {
            setNameError("");
        }

        if (!price || isNaN(price) || parseFloat(price) <= 0) {
            setPriceError("Please enter a valid price greater than 0");
            isValid = false;
        } else {
            setPriceError("");
        }

        if (!category) {
            return false;
        }

        return isValid;
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createNewProduct(name.trim(), parseFloat(price), category, image, available, parseInt(stock) || 0);

            toast.success("Added new product successfully");
            navigate("/products");
        } catch (err) {
            console.error("Error creating product:", err);
        }
    };

    return (
        <>
            <title>Add New Product | Sweety</title>

            <div className="page-container">
                <NavBar />

                <div className={styles.productModal}>
                    <div className={styles.productTitle}>
                        <h2>Add New Product</h2>
                    </div>

                    <form className={styles.productForm} onSubmit={handleAddProduct}>
                        <label htmlFor="name">Product Name</label>
                        <div className={styles.inputWrapper}>
                            <FontAwesomeIcon icon={faTag} className={styles.inputIcon} />
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Enter product name"
                                className={styles.productInput}
                            />
                        </div>

                        <label htmlFor="price">Price</label>
                        <div className={styles.inputWrapper}>
                            <FontAwesomeIcon icon={faDollarSign} className={styles.inputIcon} />
                            <input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={handlePriceChange}
                                placeholder="0.00"
                                className={styles.productInput}
                            />
                        </div>

                        <label htmlFor="image">Image Filename</label>
                        <div className={styles.inputWrapper}>
                            <FontAwesomeIcon icon={faImage} className={styles.inputIcon} />
                            <input
                                id="image"
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className={styles.fileInput}
                            />
                        </div>

                        <label htmlFor="category">Category</label>
                        <div className={styles.selectWrapper}>
                            <FontAwesomeIcon icon={faList} className={styles.selectIcon} />
                            <select
                                id="category"
                                className={styles.categorySelect}
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <option value="">Select a category</option>
                                <option value="Breads">Breads</option>
                                <option value="Cakes">Cakes</option>
                                <option value="Candies">Candies</option>
                                <option value="Pastries">Pastries</option>
                            </select>
                        </div>

                        <label htmlFor="stock">Stock Quantity</label>
                        <div className={styles.inputWrapper}>
                            <FontAwesomeIcon icon={faBoxes} className={styles.inputIcon} />
                            <input
                                id="stock"
                                type="number"
                                min="0"
                                value={stock}
                                onChange={handleInputChange(setStock)}
                                placeholder="0"
                                className={styles.productInput}
                            />
                        </div>

                        <div className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                id="available"
                                checked={available}
                                onChange={handleAvailableChange}
                                className={styles.checkbox}
                            />
                            <label htmlFor="available" className={styles.checkboxLabel}>
                                Available for sale
                            </label>
                        </div>

                        {nameError && <p className={styles.errorMessage}>{nameError}</p>}
                        {priceError && <p className={styles.errorMessage}>{priceError}</p>}
                        {error && <p className={styles.errorMessage}>{error}</p>}

                        <button type="submit" className={styles.productButton} disabled={isLoading}>
                            {isLoading ? (
                                <FontAwesomeIcon className={styles.loading} icon={faSpinner} />
                            ) : (
                                "Add Product"
                            )}
                        </button>
                    </form>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default NewProduct;
