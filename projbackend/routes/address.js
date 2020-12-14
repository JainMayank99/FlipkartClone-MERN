const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated } = require("../controllers/auth")

const { getUserById } = require("../controllers/user")

const { addAddress, removeAddress, getAllAddresses, changeDefaultAddress } = require("../controllers/address")

//parameter extractor
router.param("userId", getUserById)

//to add address
//req.body.address to contain address
router.post("/addAddress/:userId", isSignedIn, isAuthenticated, addAddress)

//to remove address
//req.body.address to contain address
router.delete("/removeAddress/:userId", isSignedIn, isAuthenticated, removeAddress)

//to get all addresses of a user
router.get("/getAllAddresses/:userId", isSignedIn, isAuthenticated, getAllAddresses)

//to change default address
//req.body.address to contain address
router.put("/changeDefaultAddress/:userId", isSignedIn, isAuthenticated, changeDefaultAddress)

module.exports = router