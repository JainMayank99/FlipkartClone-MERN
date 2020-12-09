const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated } = require("../controllers/auth")

const { getUserById } = require("../controllers/user")
const { getProductById } = require("../controllers/product")

const {
    addProductToWishList,
    getAllWishListItemsByUserId,
    removeProductFromWishList,
} = require("../controllers/wishlist")

//parameter extractor
router.param("userId", getUserById)

//parameter extractor
router.param("productId", getProductById)

//to add product
router.post("/addProductToWishList/:userId/:productId", isSignedIn, isAuthenticated, addProductToWishList)

//to get whislist of a particular user
router.get("/getAllWishListItemsByUserId/:userId", isSignedIn, isAuthenticated, getAllWishListItemsByUserId)

//to remove a product from wishlist
router.delete("/removeProductFromWishList/:userId/:productId", isSignedIn, isAuthenticated, removeProductFromWishList)


module.exports = router