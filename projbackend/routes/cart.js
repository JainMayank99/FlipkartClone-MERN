const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated } = require("../controllers/auth")

const { getUserById } = require("../controllers/user")
const { getProductById } = require("../controllers/product")

const {
    addProductToCart,
    getAllCartItemsByUserId,
    removeProductFromCart,
    updateQuantityInCart,
    toggleIsSavedForLater
} = require("../controllers/cart")


//parameter extractor
router.param("userId", getUserById)

//parameter extractor
router.param("productId", getProductById)

//to add product
router.post("/addProductToCart/:userId/:productId", isSignedIn, isAuthenticated, addProductToCart)

//to get cart items of a particular user
router.get("/getAllCartItemsByUserId/:userId", isSignedIn, isAuthenticated, getAllCartItemsByUserId)

//to remove a product from wishlist
router.delete("/removeProductFromCart/:userId/:productId", isSignedIn, isAuthenticated, removeProductFromCart)

//to update a product quantity in wishlist
//req.body to contain quantity
//send only postive (1+) values from frontend less than avalible stock
router.put("/updateQuantityInCart/:userId/:productId", isSignedIn, isAuthenticated, updateQuantityInCart)

//to toggle isSavedForLater
router.put("/toggleIsSavedForLater/:userId/:productId", isSignedIn, isAuthenticated, toggleIsSavedForLater)

module.exports = router