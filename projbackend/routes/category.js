const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

const { getCategoryById, addCategory, getAllCategory, updateCategory, removeCategory } = require("../controllers/category")


//paramneter extractor
router.param("categoryId", getCategoryById)

//parameter extractor
router.param("userId", getUserById)


//to get all category
router.get("/getAllCategory/:userId", isSignedIn, isAuthenticated, getAllCategory)

//to add new Category
//req.body to contain unique CategoryName
router.post("/addCategory/:userId", isSignedIn, isAuthenticated, isAdmin, addCategory)

//to update Category
//req.body to contain unique CategoryName
router.put("/updateCategory/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, updateCategory)

//to remove the category
router.delete("/removeCategory/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, removeCategory)


//to add subcategory to a certain category


module.exports = router