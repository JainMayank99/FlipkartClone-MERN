var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

var cartSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "UserSchema",
    },
    product: {
        type: ObjectId,
        ref: "ProductSchema"
    },
    Quantity: {
        type: Number,
        default: 1,
    },
    isSavedForLater: {
        type: Boolean,
        default: false
    }
})




module.exports = mongoose.model("CartSchema", cartSchema);
