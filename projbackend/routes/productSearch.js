const express = require("express");
const router = express.Router();

const { searchProduct } = require("../controllers/productSearch");

//will be sending all products name and images
router.post("/searchProduct", searchProduct);

module.exports = router;
