const ProductSchema = require('../models/product')

exports.getProductById = (req, res, next, id) => {
    ProductSchema.findById(id, (err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found in DB"
            })
        }
        req.product = product;
        next();
    })
}

exports.addProduct = (req, res) => {

}
