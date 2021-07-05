var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const {
	signout,
	signup,
	signin,
	forgetPassword,
	changePassword,
} = require("../controllers/auth");

router.post(
	"/signup",
	[
		check("name")
			.isLength({ min: 3 })
			.withMessage("Name should be Min 3 characters"),
		// check('phone')
		//     // .isNumeric({ min: 10, max: 10 })
		//     .withMessage('Phone Number is Required'),
		check("password")
			.isLength({ min: 5, max: 15 })
			.withMessage("Password should be 5 Character long"),
	],
	signup
);

router.post("/signin", signin);

// router.get("/test", (req, res) => {
// 	res.json("TESTING");
// });

router.get("/signout", signout);

router.post("/forgetPassword", forgetPassword);

router.post("/changePassword", changePassword);

module.exports = router;
