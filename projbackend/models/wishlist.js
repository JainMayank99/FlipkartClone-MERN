var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

var wishListSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "ProductSchema",
    },
    user: {
        type: ObjectId,
        ref: "UserSchema",
    }
})

module.exports = mongoose.model("WishListSchema", wishListSchema);
