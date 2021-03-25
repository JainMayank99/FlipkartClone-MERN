const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const { searchProduct } = require("../controllers/productSearch")
const { getUserById } = require("../controllers/user")


//parameter extractor
router.param("userId", getUserById)

//will be sending all products name and images
router.get("/searchProduct/:userId",isSignedIn,isAuthenticated ,searchProduct)


module.exports = router