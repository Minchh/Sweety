import mongoose, { mongo } from "mongoose";
import qs from "qs";
import { Product } from "../models/index.js";

/* CRUD - Product API */

// Get many products
/*
    GET /products?sort[price]=1&sort[createdAt]=-1    // price ascending, createdAt descending
    GET /products?sort[name]=1                        // name ascending  
    GET /products?sort[price]=-1                      // price descending
    GET /products?price[gte]=50&sort[price]=1         // filter + sort by price ascending
*/
export async function getProducts(req, res) {
    try {
        const { search, sort, page = 1, limit = 12, category, price, ...filters } = qs.parse(req.query);

        // Query Conditions
        const queryConditions = {
            ...filters,
            ...(search && { name: new RegExp(`^${search}`, "i") }),
            ...(category &&
                category !== "All" && {
                    category: Array.isArray(category) ? { $in: category } : category,
                }),
        };

        // Add price range filtering
        if (price && typeof price === "object") {
            queryConditions.price = {};

            if (price.gte !== undefined && price.gte !== "") {
                queryConditions.price.$gte = parseFloat(price.gte);
            }

            if (price.lte !== undefined && price.lte !== "") {
                queryConditions.price.$lte = parseFloat(price.lte);
            }

            if (price.gt !== undefined && price.gt !== "") {
                queryConditions.price.$gt = parseFloat(price.gt);
            }

            if (price.lt !== undefined && price.lt !== "") {
                queryConditions.price.$lt = parseFloat(price.lt);
            }
        }

        // Parse pagination
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(20, Math.max(1, parseInt(limit)));
        const skip = (pageNum - 1) * limitNum;

        // Parse sort - only accepts 1 and -1 format
        let sortObj = { name: 1, _id: 1 };
        if (sort && typeof sort === "object") {
            sortObj = {};
            Object.keys(sort).forEach((field) => {
                const value = parseInt(sort[field]);
                if (value === 1 || value === -1) {
                    sortObj[field] = value;
                }
            });
            // Fallback to default if no valid sort fields
            if (Object.keys(sortObj).length === 0) {
                sortObj = { name: 1, _id: 1 };
            }
        }

        const [products, totalCount] = await Promise.all([
            Product.find(queryConditions).select("-__v").sort(sortObj).skip(skip).limit(limitNum).lean(),

            Product.countDocuments(queryConditions),
        ]);

        const totalPages = Math.ceil(totalCount / limitNum);

        res.status(200).json({
            code: 200,
            status: "success",
            length: products.length,
            totalCount,
            currentPage: +page,
            totalPages,
            data: {
                products,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}

// Get single product by Id
export async function getProduct(req, res) {
    try {
        const productId = req.params.id;
        if (!mongoose.isValidObjectId(productId)) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: `Invalid product id`,
            });
            return;
        }

        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: `No such product with id ${productId}`,
            });
            return;
        }

        res.status(200).json({
            code: 200,
            status: "success",
            data: {
                product,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "success",
            message: err.message,
        });
    }
}

// Create new product(s)
export async function createProducts(req, res) {
    try {
        const isBodyArray = Array.isArray(req.body);
        const body = isBodyArray ? req.body : { ...req.body };
        const newProducts = await Product.create(body);

        if (!isBodyArray) {
            res.status(201).json({
                code: 201,
                status: "success",
                data: {
                    product: newProducts,
                },
            });
        } else {
            res.status(201).json({
                code: 201,
                status: "success",
                length: newProducts.length,
                data: {
                    product: newProducts,
                },
            });
        }
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}

// Update product by Id
export async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        if (!mongoose.isValidObjectId(productId)) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "Invalid product id",
            });
            return;
        }

        const body = { ...req.body };

        const updatedProduct = await Product.findByIdAndUpdate(productId, body, { new: true });
        if (!updatedProduct) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: `No such product with id ${productId}`,
            });
            return;
        }

        res.status(201).json({
            code: 201,
            status: "success",
            data: {
                product: updatedProduct,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}

// Delete product by Id
export async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        if (!mongoose.isValidObjectId(productId)) {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "Invalid product id",
            });
            return;
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: `No such product with id ${productId}`,
            });
            return;
        }

        res.status(200).json({
            code: 200,
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}
