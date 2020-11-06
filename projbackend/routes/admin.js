const express = require("express")
const router = express.Router()

const { getUserById } = require("../controllers/user")

const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const { isAdmin } = require("../controllers/admin")

//parameter extractor
router.param("userId", getUserById)

//to check if role==2
router.param("userId", isAdmin)


// router.get('/test/:userId', isSignedIn, isAuthenticated, isAdmin, (req, res) => {
//     console.log("isAdmin");
//     return;
// });


module.exports = router