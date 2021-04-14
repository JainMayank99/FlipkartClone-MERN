const UserSchema = require("../models/user");

exports.getUserById = (req, res, next, id) => {
	UserSchema.findById(id, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found in DB",
			});
		}
		req.profile = user;
		req.profile.salt = undefined;
		req.profile.encry_password = undefined;
		req.profile.createdAt = undefined;
		req.profile.updatedAt = undefined;
		next();
	});
};

exports.getUserDetails = (req, res) => {
	const id = req.profile._id;
	UserSchema.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				msg: "DB Error || User Not Found",
			});
		}
		let { name, email, phone } = user;
		let address = user.address.defaultAddress;

		return res.status(200).json({
			name,
			email,
			phone,
			address,
		});
	});
};

exports.editUserDetails = (req, res) => {
	const id = req.profile._id;
	UserSchema.findByIdAndUpdate(
		{ _id: id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err || !user) {
				return res.status(400).json({
					msg: "DB Error || User Not Found",
				});
			}
			const { name, email } = user;
			return res.status(200).json({
				name,
				email,
				msg: "Updated successfully",
			});
		}
	);
};

exports.becomeASeller = (req, res) => {
	UserSchema.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err || !user) {
				return res.status(400).json({
					err: "DB error or user not updated",
				});
			}
			return res.status(200).json({
				msg: "successfully upgraded to seller",
			});
		}
	);
};
