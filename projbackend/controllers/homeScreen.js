const ProductSchema = require('../models/product')

exports.getRandomProducts= (req, res)=>{
    ProductSchema.aggregate([{$sample:{size:req.body.count}}])
    .exec((err, products) => {
        if (err || !products) {
            return res.status(400).json({
                error: "Products not found in DB"
            })
        }
        return res.status(200).json(products)
    })
}