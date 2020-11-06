var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true,
    },
    image: [{
        url: {
            type: String,
            required: true,
            default: ""
        },
        ImgPath: {
            type: String,
            required: true,
            default: ""
        },
    }],//from frontend only take 4
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true,
            default: 0
        }, discount: {
            type: Number,
            required: true,
            default: 0
        }
    },
    Reviews: [{
        user: {
            type: ObjectId,
            ref: "UserSchema"
        },
        starCount: {
            type: Number,
            default: 0,
        },
        reviewText: {
            type: String,
            maxlength: 100
        }
    }],
    updateTimer: {//in Minutes
        processing: {
            type: Number
        },
        shipping: {
            type: Number
        },
        delivery: {
            type: Number
        },
    },
    category: {
        type: ObjectId,
        ref: "CategorySchema"
    },
    sellerDetails: {
        type: ObjectId,
        ref: "UserSchema"
    }
}, { timestamps: true })


module.exports = mongoose.model("ProductSchema", productSchema);
