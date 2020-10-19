var mongoose = require("mongoose");


var productSchema = new mongoose.Schema({
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
        }
    }],
    stock: {
        type: Number,
        default: 0,
        required: true,
    },
    price: {
        amount: {
            type: Number,
            required: true
        }, discount: {
            type: Number,
            required: true,
            default: 0
        }
    },
    category: CategorySchema,
    Reviews: [{
        user: UserSchema,
        starCount: {
            type: Number,
            default: 0,
        },
        reviewText: {
            type: String,
        }
    }],
    updateTimer: {
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
    sellerDetails: UserSchema
}, { timestamps: true })


module.exports = mongoose.model("ProductSchema", productSchema);
