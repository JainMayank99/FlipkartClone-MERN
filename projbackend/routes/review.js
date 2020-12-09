const express = require("express")
const router = express.Router()

const {
    isSignedIn,
    isAuthenticated,
    isSeller,
    isAuthorized
} = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

const { getProductById } = require("../controllers/product")

//parameter extractor
router.param("userId", getUserById)

//parameter extractor
router.param("productId", getProductById)


// //to add product
// router.post("/addReview/:userId/:productId", isSignedIn, isAuthenticated,  ,addReview)








module.exports = router