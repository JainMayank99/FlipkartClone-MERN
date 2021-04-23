const ProductSchema = require("../models/product");
const ReviewSchema = require("../models/review");

exports.getReviewById = (req, res, next, id) => {
	ReviewSchema.findById(id, (err, review) => {
		if (err || !review) {
			return res.status(400).json({
				error: "Review not found in DB",
			});
		}
		req.review = review;
		next();
	});
};

exports.getUserReviewByProductId = async (req, res) => {
	await ReviewSchema.find({
		user: req.profile._id,
		product: req.product._id,
	}).exec(async (err, review) => {
		if (err) {
			return res.status(500).json({
				err: "DB error",
			});
		}
		if (review.length == 0) {
			return res.status(200).json({
				starCount: 0,
				reviewText: "",
			});
		} else {
			return res.status().json(review);
		}
	});
};

//TODO: dont allow if order not placed can't add review
exports.addReview = async (req, res) => {
	console.log(req.body)
	// await ReviewSchema.find({
	// 	user: req.profile._id,
	// 	product: req.product._id,
	// }).exec(async (err, review) => {
	// 	if (err) {
	// 		return res.status(500).json({
	// 			err: "DB error",
	// 		});
	// 	}
	// 	if (review.length != 0) {
	// 		return res.status(400).json({
	// 			err: "review already exists",
	// 		});
	// 	}
	// });

	let review = new ReviewSchema(req.body);
	review.user = req.profile._id;
	review.product = req.product._id;

	await review.save(async (err, review) => {
		if (err) {
			return res.status(400).json({
				err: "NOT able to save Review in DB !",
			});
		}

		await ProductSchema.find({ _id: req.product._id }).exec(
			async (err, prod) => {
				if (err || !prod) {
					return res.status(400).json({
						err: "DB error or product not found",
					});
				}

				await ReviewSchema.find({ product: req.product._id }).exec(
					async (err, review) => {
						if (err) {
							return res.status(500).json({
								err: "DB error",
							});
						}
						// console.log(review);
						if (review.length > 1) {
							let starSum = 0;

							review.map((rev) => {
								// console.log("rev", rev);
								starSum += rev.starCount;
							});

							let avgRating = starSum / review.length;

							prod[0].avgRating = avgRating;
						} else {
							prod[0].avgRating = review[0].starCount;
						}
						await prod[0].save((err, product) => {
							if (err) {
								return res.status(500).json({
									err: "error in saving product avgRating",
								});
							}
							// console.log(product);
							return res.status(200).json({
								msg: "review added successfully and avgRating updated",
							});
						});
					}
				);
			}
		);
	});
};

exports.updateReview = async (req, res) => {
	// console.log("update review");
	if (req.profile._id.toString() === req.review.user.toString()) {
		ReviewSchema.findByIdAndUpdate(
			{ _id: req.review._id },
			{ $set: req.body },
			{ new: true, useFindAndModify: false },
			(err, review) => {
				if (err || !review) {
					return res.status(400).json({
						err: "DB error or review not updated",
					});
				}
				return res.status(200).json(review);
			}
		);
	} else {
		return res.status(400).json({
			err: "Not allowed to update review",
		});
	}
};

exports.removeReview = async (req, res) => {
	if (
		req.profile._id.toString() === req.review.user.toString() ||
		req.profile.role == 2
	) {
		ReviewSchema.findByIdAndDelete({ _id: req.review._id }, (err, review) => {
			if (err || !review) {
				return res.status(400).json({
					err: "DB Error or Category not Deleted",
				});
			}
			return res
				.status(200)
				.json({ msg: "review deleted successfully", review });
		});
	} else {
		return res.status(400).json({
			err: "Not allowed to delete review",
		});
	}
};

exports.getReviewByUserId = async (req, res) => {
	if (req.profile._id != undefined || req.profile.role == 2) {
		ReviewSchema.find({ user: req.profile._id }).exec((err, reviews) => {
			if (err) {
				return res.status(500).json({
					err: "DB error",
				});
			}
			if (!reviews) {
				return res.status(200).json({
					err: "No review exist",
				});
			}
			return res.status(200).json(reviews);
		});
	} else {
		return res.status(400).json({
			err: "Not allowed to get review",
		});
	}
};

exports.getReviewByProductId = async (req, res) => {
	ReviewSchema.find({ product: req.product._id }).exec((err, reviews) => {
		if (err) {
			return res.status(500).json({
				err: "DB error",
			});
		}
		if (!reviews) {
			return res.status(200).json({
				err: "No review exist",
			});
		}
		return res.status(200).json(reviews);
	});
};
