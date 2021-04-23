var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "ProductSchema"
    },
    user: {
        type: ObjectId,
        ref: "UserSchema"
    },
    starCount: {
        type: Number,
        default: 0,
        required: true,
    },
    reviewText: {
        type: String,
        maxlength: 100,
        default:""
    }
}, { timestamps: true })




module.exports = mongoose.model("ReviewSchema", reviewSchema);
