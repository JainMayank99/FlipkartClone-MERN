const express = require("express");
const router = express.Router();

const { isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const { emptyCart } = require("../controllers/cart");
const {
	paymentByCard,
	paymentByCash,
	getOrdersByUserId,
} = require("../controllers/order");

//parameter extractor
router.param("userId", getUserById);

//add order

//by card number
//req.body to contain array products:[productId, quantity] ordered
router.post(
	"/paymentByCard/:userId",
	isSignedIn,
	isAuthenticated,
	// updateStock,
	// emptyCart,
	paymentByCard
);

//by cash
//req.body to contain array products:[productId, quantity] ordered
router.post(
	"/paymentByCash/:userId",
	isSignedIn,
	isAuthenticated,
	updateStock,
	emptyCart,
	paymentByCash
);

//getOrdersByUserId
router.get(
	"/getOrdersByUserId/:userId",
	isSignedIn,
	isAuthenticated,
	getOrdersByUserId
);
module.exports = router;
