const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const { getUserById, isAuthorized } = require("../controllers/user")
const { getProductById } = require("../controllers/product")


//parameter extractor
router.param("productId", getProductById)

//to add product


module.exports = router