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


const Product = new mongoose.model("Product", productSchema);

export default Product;