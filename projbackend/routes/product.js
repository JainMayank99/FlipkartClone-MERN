const express = require("express");
const router = express.Router();

const {
	isSignedIn,
	isAuthenticated,
	isSeller,
	isAuthorized,
} = require("../controllers/auth");

const { getUserById } = require("../controllers/user");
const { getCategoryById } = require("../controllers/category");
const {
	getProductById,
	addProduct,
	getAllProducts,
	getProductsByUserId,
	getProductsByCategoryId,
	updateProduct,
	removeProduct,
} = require("../controllers/product");

//parameter extractor
router.param("userId", getUserById);

//paramneter extractor
router.param("categoryId", getCategoryById);

//parameter extractor
router.param("productId", getProductById);

//to add product
router.post(
	"/addProduct/:userId/:categoryId",
	isSignedIn,
	isAuthenticated,
	isSeller,
	addProduct
);

// //to get all products
// router.get("/getAllProducts", getAllProducts)

//to get products of a seller
router.get("/getProductsByUserId/:userId", getProductsByUserId);

//to get products of a category id
router.post("/getProductsByCategoryId/:categoryId", getProductsByCategoryId);

//to update a product
router.put(
	"/updateProduct/:userId/:productId",
	isSignedIn,
	isAuthenticated,
	isSeller,
	updateProduct
);

//to remove a product
router.delete(
	"/removeProduct/:userId/:productId",
	isSignedIn,
	isAuthenticated,
	isSeller,
	removeProduct
);

module.exports = router;
