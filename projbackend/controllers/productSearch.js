const ProductSchema = require("../models/product");

exports.searchProduct = async (req, res) => {
	// let search = req.body.searchTerm;

	// let val = new RegExp(`^${search}|${search}$|${search}`, "gi");
	// console.log("search product");
	await ProductSchema.find()
		// .select("name image")
		.then((result) => {
			return res.status(200).json(result);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
};
