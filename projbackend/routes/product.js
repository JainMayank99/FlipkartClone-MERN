const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated, isSeller } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { getProductById, addProduct } = require("../controllers/product")


//parameter extractor
router.param("userId", getUserById)

//parameter extractor
router.param("productId", getProductById)

//to add product
router.post("/addProduct/:userId", isSignedIn, isAuthenticated, isSeller, addProduct)

module.exports = router