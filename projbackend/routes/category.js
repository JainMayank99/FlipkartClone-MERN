const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated, isAdmin, isAuthorized } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

const {
    getCategoryById,
    addCategory,
    getAllCategory,
    updateCategory,
    removeCategory,
    addSubCategory,
    getAllSubCategoryToACategory,
    updateSubCategory,
    removeSubCategory
} = require("../controllers/category")


//paramneter extractor
router.param("categoryId", getCategoryById)

//parameter extractor
router.param("userId", getUserById)


//to get all category
router.get("/getAllCategory/:userId", isSignedIn, isAuthenticated, getAllCategory)

//to add new Category
//req.body to contain CategoryName
router.post("/addCategory/:userId", isSignedIn, isAuthenticated, isAdmin, addCategory)

//to update Category
//req.body to contain CategoryName
router.put("/updateCategory/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, updateCategory)

//to remove the category
router.delete("/removeCategory/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, removeCategory)


//to add subcategory to a certain category
//req.body to contain SubCategoryName
router.post("/addSubCategory/:userId/:categoryId", isSignedIn, isAuthenticated, isAuthorized, addSubCategory)

//get all subcategories of that category
router.get("/getAllSubCategoryToACategory/:userId/:categoryId", isSignedIn, isAuthenticated, isAuthorized, getAllSubCategoryToACategory)

//to Update a subCategoryName
//req.body to contain SubCategoryName
router.put("/updateSubCategory/:userId/:categoryId", isSignedIn, isAuthenticated, isAuthorized, updateSubCategory)

// to remove the category
router.delete("/removeSubCategory/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, removeSubCategory)

module.exports = router