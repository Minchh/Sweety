import { Product } from "../models/index.js";

/* CRUD - Product API */

// Get many products
export async function getProducts(req, res) {
	try {
		const products = await Product.find();

		res.status(200).json({
			code: 200,
			status: "success",
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

		const product = await Product.findById(productId);

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

// Create new product
export async function createProduct(req, res) {
	try {
		const body = { ...req.body };
		const newProduct = await Product.create(body, { new: true });

		res.status(201).json({
			code: 201,
			status: "success",
			data: {
				product: newProduct,
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

// Update product by Id
export async function updateProduct(req, res) {
	try {
		const productId = req.params.id;
		const body = { ...req.body };

		const updatedProduct = await Product.findByIdAndUpdate(productId, body, { new: true });

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

        const deletedProduct = await Product.findByIdAndDelete(productId);

        res.status(200).json({
            code: 200,
            status: "success",
            data: null,
        })
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        })
    }
}
