const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated, isSeller, isAuthorized } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { getCategoryById, } = require("../controllers/category")
const { getProductById, addProduct, getAllProducts, getProductByUserId } = require("../controllers/product")


//parameter extractor
router.param("userId", getUserById)

//paramneter extractor
router.param("categoryId", getCategoryById)

//parameter extractor
router.param("productId", getProductById)

//to add product
router.post("/addProduct/:userId/:categoryId", isSignedIn, isAuthenticated, isSeller, addProduct)

//to get all products
router.get("/getAllProducts", getAllProducts)

//to get products of a seller
router.get("/getProductByUserId/:userId", isSignedIn, isAuthenticated, isAuthorized, getProductByUserId)



module.exports = router