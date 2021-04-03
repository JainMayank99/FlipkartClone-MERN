const WishListSchema = require("../models/wishlist");

exports.addProductToWishList = async (req, res) => {
	await WishListSchema.find({
		user: req.profile._id,
		product: req.product._id,
	}).exec(async (err, wishlist) => {
		if (err) {
			return res.status(400).json({
				err: "NOT able to get wishlist in DB !",
			});
		}
		if (wishlist.length != 0) {
			return res.status(200).json({
				msg: "Item already exists in wishlist in DB !",
			});
		}
		wishlist = new WishListSchema();
		wishlist.user = req.profile._id;
		wishlist.product = req.product._id;
		await wishlist.save((err, wishlist) => {
			if (err) {
				return res.status(400).json({
					err: "NOT able to save wishlist in DB !",
				});
			}
			res.status(200).json(wishlist);
		});
	});
};

exports.getAllWishListItemsByUserId = async (req, res) => {
	await WishListSchema.find({ user: req.profile._id })
		.populate(
			"product"
			// "_id name image stock price discount avgRating description"
		)
		.exec((err, wishlist) => {
			if (err || !wishlist) {
				return res.status(400).json({
					error: "Wishlist not found in DB",
				});
			}
			return res.status(200).json(wishlist);
		});
};

exports.removeProductFromWishList = async (req, res) => {
	await WishListSchema.findOneAndDelete({
		user: req.profile._id,
		product: req.product._id,
	}).exec((err, wishlist) => {
		if (err || !wishlist) {
			return res.status(400).json({
				error: "Not Able to remove product from wishlist in DB",
			});
		}
		return res.status(200).json(wishlist);
	});
};
