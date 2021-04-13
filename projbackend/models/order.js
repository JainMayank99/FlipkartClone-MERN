var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var orderSchema = new mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: "UserSchema",
		},
		product: {
			type: ObjectId,
			ref: "ProductSchema",
		},
		quantity: {
			type: Number,
			required: true,
		},
		transactionId: {
			type: String,
			required: true,
			default: "",
		},
		modeOfPayment: {
			type: String,
			required: true,
			default: "",
		}
		// status: {
		// 	type: String,
		// 	default: "Processing",
		// 	enum: ["Processing", "Shipped", "Delivered"],
		// },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("OrderSchema", orderSchema);
