const ProductSchema = require("../models/product");

exports.getRandomProducts = async (req, res) => {
	ProductSchema.aggregate([{ $sample: { size: req.body.count } }]).exec(
		(err, products) => {
			if (err || !products) {
				return res.status(400).json({
					error: "Products not found in DB",
				});
			}
			return res.status(200).json(products);
		}
	);
};

exports.getTopRatedProducts = async (req, res) => {
	ProductSchema.find()
		.sort({ avgRating: "descending" })
		.limit(5)
		.exec((err, products) => {
			if (err || !products) {
				return res.status(400).json({
					error: "Products not found in DB",
				});
			}
			return res.status(200).json(products);
		});
};

exports.getTopRatedProductsBasedOnCategoryId = async (req, res) => {
	ProductSchema.find({ category: req.category._id })
		.sort({ avgRating: "descending" })
		.limit(5)
		.exec((err, products) => {
			if (err || !products) {
				return res.status(400).json({
					error: "Products not found in DB",
				});
			}
			return res.status(200).json(products);
		});
};
