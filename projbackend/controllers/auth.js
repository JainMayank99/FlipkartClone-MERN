const UserSchema = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
	// console.log("came to backend");
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// console.log("sign up error", errors);
		return res.status(422).json({
			error: errors.array()[0].msg,
			param: errors.array()[0].param,
		});
	}

	const user = new UserSchema(req.body);

	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				msg: "NOT able to save user in DB !",
			});
		}
		return res.status(200).json({
			id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
		});
	});
};

exports.signin = (req, res) => {
	// console.log("SignIn Backend hit");
	const { phone, password } = req.body;
	const errors = validationResult(req);

	if (phone != null && phone.toString().length === 0) {
		return res.status(401).json({
			msg: "Enter Your Phone Number",
		});
	}

	if (!errors.isEmpty()) {
		console.log("SignIn Error:", errors);
		return res.status(422).json({
			msg: errors.array()[0].msg,
			param: errors.array()[0].param,
		});
	}
	if (phone.length != 0) {
		UserSchema.findOne({ phone }, (err, user) => {
			if (err) {
				return res.status(400).send({
					msg: "DB Error !",
				});
			}

			if (!user) {
				return res.status(400).send({
					msg: "User phone number not found !",
				});
			}

			//checking for password from DB
			if (!user.authenticate(password)) {
				if (password.length === 0) {
					return res.status(401).json({
						msg: "Enter Your Password !",
					});
				} else {
					return res.status(401).json({
						msg: "Phone and Password does not match !",
					});
				}
			}

			//Signin the user by
			//Create the token put it in Cookie
			//Creating Token
			const token = jwt.sign({ _id: user._id }, process.env.SECRET);
			//Put Token in Cookie
			res.cookie("token", token, { expire: new Date() + 9999 });

			//sending response to frontEnd
			const { _id, name, email, phone,role } = user;
			return res.json({
				token,
				user: {
					_id,
					name,
					email,
					phone,
					role
					// address
				},
			});
		});
	} else {
		UserSchema.findOne({ email }, (err, user) => {
			if (err) {
				return res.status(400).json({
					msg: "DB Error !",
				});
			}

			if (!user) {
				return res.status(400).json({
					msg: "User email not found !",
				});
			}

			//checking for password from DB
			if (!user.authenticate(password)) {
				if (password.length === 0) {
					return res.status(401).json({
						msg: "Enter Your Password !",
					});
				} else {
					return res.status(401).json({
						msg: "Email and Password does not match !",
					});
				}
			}

			//Signin the user by
			//Create the token put it in Cookie
			//Creating Token
			const token = jwt.sign({ _id: user._id }, process.env.SECRET);
			//Put Token in Cookie
			res.cookie("token", token, { expire: new Date() + 9999 });

			//sending response to frontEnd
			const { _id, name, email, phone } = user;
			return res.json({
				token,
				user: {
					_id,
					name,
					email,
					phone,
				},
			});
		});
	}
};

exports.signout = (req, res) => {
	res.clearCookie("token");
	res.json({
		message: "User Signout Successful",
	});
};

//Protected Routes
exports.isSignedIn = expressJwt({
	secret: process.env.SECRET,
	algorithms: ["HS256"],
	userProperty: "auth",
});

//custom MiddleWares
//req.profile is set up by getUserById  controller
exports.isAuthenticated = (req, res, next) => {
	let checker = req.profile && req.auth && req.profile._id == req.auth._id;

	// console.log(req.profile);
	// console.log(req.auth);

	if (!checker) {
		return res.status(403).json({
			error: "Access Denied",
		});
	}
	next();
};

//middleware for checking user is seller or not
exports.isSeller = (req, res, next) => {
	// console.log(req.profile);
	if (req.profile.role != 1) {
		return res.status(400).json({
			error: "User not a Seller",
		});
	}
	next();
};

//middleware for checking user is admin or not
exports.isAdmin = (req, res, next) => {
	if (req.profile.role != 2) {
		return res.status(400).json({
			error: "User not an Admin",
		});
	}
	next();
};

//middle ware to check if user is seller or admin
exports.isAuthorized = (req, res, next) => {
	// console.log(req.profile);
	if (req.profile.role == 1 || req.profile.role == 2) {
		next();
	} else {
		return res.status(400).json({
			error: "User not a Authorized",
		});
	}
};

exports.forgetPassword = async (req, res) => {
	UserSchema.find({ phone: req.body.phone }).exec((err, user) => {
		// console.log(err);
		if (err || !user) {
			return res.status(400).json({
				err: "DB error or user not found",
			});
		}

		user[0].password = req.body.password;

		user[0].save((err, user) => {
			if (err) {
				return res.status(400).json({
					msg: "NOT able to save user in DB !",
				});
			}

			return res.status(200).json({
				msg: "password updated successfully",
				id: user._id,
				name: user.name,
				email: user.email,
				phone: user.phone,
			});
		});
	});
};

exports.changePassword = async (req, res) => {
	// const user = new UserSchema(req.body);

	UserSchema.find({ phone: req.body.phone }).exec((err, user) => {
		// console.log(err);
		if (err || !user) {
			return res.status(400).json({
				err: "DB error or user not found",
			});
		}
		//TODO: match with old password

		user[0].password = req.body.password;

		user[0].save((err, user) => {
			if (err) {
				return res.status(400).json({
					msg: "NOT able to save user in DB !",
				});
			}

			return res.status(200).json({
				msg: "password updated successfully",
				id: user._id,
				name: user.name,
				email: user.email,
				phone: user.phone,
			});
		});
	});
};
