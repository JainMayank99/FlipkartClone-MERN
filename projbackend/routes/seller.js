const express = require("express")
const router = express.Router()

const { getUserById } = require("../controllers/user")

const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const { isSeller } = require("../controllers/seller")

//parameter extractor
router.param("userId", getUserById)

//to check if role==1
router.param("userId", isSeller)

// router.get('/test/:userId', isSignedIn, isAuthenticated, isSeller, (req, res) => {
//     console.log("isSeller");
// });


module.exports = router