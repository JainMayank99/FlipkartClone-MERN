const express = require("express");
const router = express.Router();

const {
	getRandomProducts,
	getTopRatedProducts,
	getTopRatedProductsBasedOnCategoryId,
} = require("../controllers/homeScreen");

const { getCategoryById } = require("../controllers/category");

//paramneter extractor
router.param("categoryId", getCategoryById);

router.post("/getRandomProducts", getRandomProducts);

router.get("/getTopRatedProducts", getTopRatedProducts);

router.get(
	"/getTopRatedProductsBasedOnCategoryId/:categoryId",
	getTopRatedProductsBasedOnCategoryId
);

module.exports = router;
