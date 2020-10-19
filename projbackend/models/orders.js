var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema(
    {
        user: UserSchema,
        product: ProductSchema,
        tansactionId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Processing",
            enum: ["Processing", "Shipped", "Delivered"]
        },
    }, { timestamps: true }
)


module.exports = mongoose.model("OrderSchema", orderSchema);
