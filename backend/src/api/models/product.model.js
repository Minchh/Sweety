import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		category: {
			type: String,
			trim: true,
		},
        price: Number,
		available: Boolean,
		stock: Number,
		size: [
			{
				weight: Number,
				unit: String,
			},
		],
		tags: [String],
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
