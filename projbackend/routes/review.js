const express = require("express");
const router = express.Router();

const {
	isSignedIn,
	isAuthenticated,
	isSeller,
	isAuthorized,
} = require("../controllers/auth");

const { getUserById } = require("../controllers/user");

const { getProductById } = require("../controllers/product");

const {
	addReview,
	getReviewById,
	updateReview,
	removeReview,
	getReviewByUserId,
	getReviewByProductId,
} = require("../controllers/review");

//parameter extractor
router.param("userId", getUserById);

//parameter extractor
router.param("productId", getProductById);

//parameter extractor
router.param("reviewId", getReviewById);

//TODO: add middleware to only allow those to add review if order schema contain that user ID and product ID
// //to add product
//req.body to contain startCount and reviewText
router.post(
	"/addReview/:userId/:productId",
	isSignedIn,
	isAuthenticated,
	addReview
);

//to update a review
router.put(
	"/updateReview/:userId/:reviewId",
	isSignedIn,
	isAuthenticated,
	updateReview
);

//to remove a review
router.delete(
	"/removeReview/:userId/:reviewId",
	isSignedIn,
	isAuthenticated,
	removeReview
);

//to get review based on userId
router.get(
	"/getReviewByUserId/:userId",
	isSignedIn,
	isAuthenticated,
	getReviewByUserId
);

//to get review based on productId
router.post("/getReviewByProductId/:productId", getReviewByProductId);

module.exports = router;
