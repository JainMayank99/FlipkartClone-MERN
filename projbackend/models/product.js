var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 200,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			maxlength: 2000,
			trim: true,
		},
		tribe: {
			type: String,
			required: true,
			maxlength: 100,
			trim: true,
			default: "Karnataka",
		},
		image: [
			{
				url: {
					type: String,
					required: true,
					default: "",
				},
				ImgPath: {
					type: String,
					required: true,
					default: "",
				},
			},
		], //from frontend only take 4
		stock: {
			type: Number,
			default: 0,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		discount: {
			type: Number,
			required: true,
			default: 0,
			max: 99,
		},
		Reviews: [
			{
				type: ObjectId,
				ref: "ReviewSchema",
			},
		],
		avgRating: {
			type: Number,
			required: true,
			default: 0,
		},
		// updateTimer: {//in Minutes
		//     processing: {
		//         type: Number
		//     },
		//     shipping: {
		//         type: Number
		//     },
		//     delivery: {
		//         type: Number
		//     },
		// },
		category: {
			type: ObjectId,
			ref: "CategorySchema",
		},
		sellerDetails: {
			type: ObjectId,
			ref: "UserSchema",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("ProductSchema", productSchema);
