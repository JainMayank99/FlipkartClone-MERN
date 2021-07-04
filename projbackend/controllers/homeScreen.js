const ProductSchema = require("../models/product");
const CategorySchema = require("../models/category");

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

exports.getRandomCategory = async (req, res) => {
	CategorySchema.aggregate([{ $sample: { size: 2 } }]).exec(
		(err, categorys) => {
			if (err || !categorys) {
				return res.status(400).json({
					error: "Category not found in DB",
				});
			}
			return res.status(200).json(categorys);
		}
	);
};

exports.getNewlyArrivedProduct = async (req, res) => {
	ProductSchema.find()
		.sort({ createdAt: "descending" })
		.limit(6)
		.exec((err, products) => {
			if (err || !products) {
				return res.status(400).json({
					error: "Products not found in DB",
				});
			}
			return res.status(200).json(products);
		});
};

exports.getProductBasedOnTribe = async (req, res) => {
	if (req.body.tribe == null || req.body.tribe.length == 0) {
		return res.status(400).json({ error: "tribe not mentioned" });
	}

	ProductSchema.find({ tribe: req.body.tribe }).exec((err, products) => {
		if (err || !products) {
			return res.status(400).json({
				error: "Products not found in DB",
			});
		}
		return res.status(200).json(products);
	});
};
