const ProductSchema = require("../models/product");
const ReviewSchema = require("../models/review");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
var cloudinary = require("cloudinary").v2;
const _ = require("lodash");

exports.getProductById = (req, res, next, id) => {
	ProductSchema.findById(id)
		// .populate('sellerDetails')
		.exec((err, product) => {
			if (err || !product) {
				return res.status(400).json({
					error: "Product not found in DB",
				});
			}
			req.product = product;
			next();
		});
};

//Note: later change the map to for with await
exports.addProduct = (req, res) => {
	console.log("Hitting", req.body);
	let form = new formidable.IncomingForm({
		multiples: true,
		keepExtensions: true,
		maxFileSize: 10 * 1024 * 1024,
	});

	//fields to contain name,description
	//send at max 4
	form.parse(req, (err, fields, files) => {
		console.log("fields:", fields);
		console.log("files:", files);
		if (err) {
			return res.status(400).json({
				error: "problem with image",
			});
		}

		const product = new ProductSchema(fields);
		product.sellerDetails = req.profile._id;
		product.category = req.category._id;

		let imgDetails = new Array();
		let count = 0;

		Object.keys(files).map(async (key) => {
			// console.log(key + ":" + files[key].path);
			const uniqueFileName = uuidv4();

			await cloudinary.uploader.upload(
				files[key].path.toString(),
				{
					public_id: `FlipkartClone/${uniqueFileName}`,
					tags: `FlipkartClone`,
					quality: "auto",
				},
				(err, image) => {
					if (err) {
						console.log("Error:" + err);
						return res.status(500).send(err);
					}
					// console.log(image);
					// console.log("PIC UPLOADED to Cloudinary");

					let obj = { ImgPath: image.public_id, url: image.url };
					imgDetails.push(obj);
					count++;

					// console.log(count, ",", Object.keys(files).length);
					if (count === Object.keys(files).length) {
						product.image.push(...imgDetails);
						// console.log("Product" + product);

						product.save((err, product) => {
							if (err) {
								return res.status(400).json({
									error: "Saving product in DB failed",
								});
							}
							return res.status(200).json(product);
						});
					}
				}
			);
		});
	});

	// form.on('progress', (bytesReceived, bytesExpected) => {
	//     console.log("InProgress");
	//     console.log("bytesReceived " + bytesReceived);
	//     console.log("bytesExpected " + bytesExpected);
	// });

	// form.on('fields', (name, value) => {
	//     console.log("fieldsname " + name);
	//     console.log("value " + value);
	// })
	// form.on('file', (name, file) => {
	//     console.log("filename " + name);
	//     console.log("file " + file);
	// })

	form.on("error", (err) => {
		// console.log("error in uploading");
		return res.status(500).send("Server error");
	});

	form.on("aborted", () => {
		// console.log("Aborted by user or timeout");
		return res.status(408).send("Aborted by user or timeout");
	});

	// form.on('end', () => {
	//     console.log("Uploaded successfully");
	//     return res.status(200).send("Uploaded successfully")
	// });

	//multiple file to clodinary using promises
	//incomplete , for reference
	//https://scotch.io/@codebyomar/how-to-upload-multiple-images-with-cloudinary-and-node-js
};

exports.getSingleProductByUserId = (req, res) => {
	ProductSchema.find({ _id: req.product._id, sellerDetails: req.profile._id })
		.populate("category")
		.exec((err, products) => {
			if (err) {
				return res.status(500).json({
					error: "DB error",
				});
			}
			if (!products) {
				return res.status(204).json({
					error: "No Products found",
				});
			}
			return res.status(200).json(products[0]);
		});
};

exports.getAllProducts = (req, res) => {
	ProductSchema.find()
		// .populate("category")
		.exec((err, products) => {
			if (err || !products) {
				return res.status(400).json({
					error: "Products not found in DB",
				});
			}
			return res.status(200).json(products);
		});
};

exports.getProductsByUserId = (req, res) => {
	ProductSchema.find({ sellerDetails: req.profile._id })
		.populate("category")
		.exec((err, products) => {
			if (err) {
				return res.status(500).json({
					error: "DB error",
				});
			}
			if (!products) {
				return res.status(204).json({
					error: "No Products found",
				});
			}
			return res.status(200).json(products);
		});
};

exports.getProductsByCategoryId = (req, res) => {
	ProductSchema.find({ category: req.category._id })
		// .populate("sellerDetails")
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: "Saving product in DB failed",
				});
			}
			if (!products) {
				return res.status(204).json({
					message: "No Products found",
				});
			}
			return res.status(200).json(products);
		});
};

exports.updateProduct = (req, res) => {
	// console.log(req.profile._id.toString());
	// console.log(req.product.sellerDetails.toString());
	if (req.profile._id.toString() != req.product.sellerDetails.toString()) {
		return res.status(401).json({
			error: "Unauthorized",
		});
	}

	let form = new formidable.IncomingForm({
		multiples: true,
		keepExtensions: true,
		maxFileSize: 10 * 1024 * 1024,
	});

	//fields to contain name,description
	//send at max 4
	form.parse(req, (err, fields, files) => {
		console.log("fields:", fields);
		console.log("files:", files);
		if (err) {
			return res.status(400).json({
				error: "problem with image",
			});
		}
		let product = req.product;

		let removableImagesArray = product.image;

		//to remove old images from cloudinary
		removableImagesArray.map((image) => {
			cloudinary.uploader.destroy(image.ImgPath, function (result) {});
		});

		product.image = [];
		product = _.extend(product, fields);

		let imgDetails = new Array();
		let count = 0;

		Object.keys(files).map(async (key) => {
			// console.log(key + ":" + files[key].path);
			const uniqueFileName = uuidv4();

			await cloudinary.uploader.upload(
				files[key].path.toString(),
				{
					public_id: `FlipkartClone/${uniqueFileName}`,
					tags: `FlipkartClone`,
					quality: "auto",
				},
				(err, image) => {
					if (err) {
						console.log("Error:" + err);
						return res.status(500).send(err);
					}
					// console.log(image);
					// console.log("PIC UPLOADED to Cloudinary");

					let obj = { ImgPath: image.public_id, url: image.url };
					imgDetails.push(obj);
					count++;

					// console.log(count, ",", Object.keys(files).length);
					if (count === Object.keys(files).length) {
						product.image.push(...imgDetails);
						// console.log("Product" + product);

						product.save((err, product) => {
							if (err) {
								console.log(err);
								return res.status(400).json({
									error: "Updating product in DB failed",
								});
							}
							return res.status(202).json(product);
						});
					}
				}
			);
		});
	});
	form.on("error", (err) => {
		// console.log("error in uploading");
		return res.status(500).send("Server error");
	});

	form.on("aborted", () => {
		// console.log("Aborted by user or timeout");
		return res.status(408).send("Aborted by user or timeout");
	});
};

exports.removeProduct = (req, res) => {
	console.log("Remove Product backend", req.profile, req.product);
	if (req.profile._id.toString() != req.product.sellerDetails.toString()) {
		return res.status(401).json({
			error: "Unauthorized",
		});
	}

	let product = req.product;

	let removableImagesArray = product.image;

	//to remove old images from cloudinary
	removableImagesArray.map((image) => {
		cloudinary.uploader.destroy(image.ImgPath, function (result) {});
	});

	ReviewSchema.deleteMany({ product: req.product._id }).exec((err, review) => {
		if (err) {
			return res.status(500).json({
				error: "Failed to remove review of the product",
			});
		}
	});

	product.remove((err, deletedProduct) => {
		if (err) {
			return res.status(500).json({
				error: "Failed to delete the product",
			});
		}
		return res.json({
			message: "Deletion was a success",
			deletedProduct,
		});
	});
};

exports.updateStock = (req, res, next) => {
	let myOperations = req.body.products.map((product) => {
		return {
			updateOne: {
				filter: { _id: product._id },
				update: { $inc: { stock: -product.quantity } },
			},
		};
	});

	ProductSchema.bulkWrite(myOperations, {}, (err, products) => {
		if (err) {
			return res.status(400).json({
				error: "Bulk operation failed",
			});
		}
		next();
	});
};
