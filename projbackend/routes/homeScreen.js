const express = require("express");
const router = express.Router();

const {
	getRandomProducts,
	getTopRatedProducts,
	getTopRatedProductsBasedOnCategoryId,
	getRandomCategory,
	getNewlyArrivedProduct,
	getProductBasedOnTribe,
} = require("../controllers/homeScreen");

const { getCategoryById } = require("../controllers/category");

//paramneter extractor
router.param("categoryId", getCategoryById);

router.post("/getRandomProducts", getRandomProducts);

router.get("/getTopRatedProducts", getTopRatedProducts);

router.post(
	"/getTopRatedProductsBasedOnCategoryId/:categoryId",
	getTopRatedProductsBasedOnCategoryId
);

router.get("/getRandomCategory", getRandomCategory);

router.get("/getNewlyArrivedProduct", getNewlyArrivedProduct);

//req.body.tribe to contain tribe name in proper casing
router.post("/getProductBasedOnTribe", getProductBasedOnTribe);

module.exports = router;
