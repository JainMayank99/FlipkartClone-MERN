const CartSchema = require('../models/cart')


exports.addProductToCart = async (req, res) => {
    await CartSchema.find({ user: req.profile._id, product: req.product._id })
        .exec(async (err, cartItem) => {
            if (err) {
                return res.status(400).json({
                    err: 'NOT able to get cartItem in DB !',
                });
            }
            if (cartItem.length != 0) {
                return res.status(400).json({
                    err: 'Item already exists in cart !'
                });
            }
            cartItem = new CartSchema();
            cartItem.user = req.profile._id
            cartItem.product = req.product._id
            await cartItem.save((err, cartItem) => {
                if (err) {
                    return res.status(400).json({
                        err: 'NOT able to save cartItem in DB !',
                    });
                }
                res.status(200).json(cartItem);
            });
        })
}

exports.getAllCartItemsByUserId = async (req, res) => {
    await CartSchema.find({ user: req.profile._id })
        .populate("product", "_id name image stock price discount")
        .exec((err, cartItems) => {
            if (err || !cartItems) {
                return res.status(400).json({
                    error: "cartItems not found in DB"
                })
            }
            return res.status(200).json(cartItems)
        })
}

exports.removeProductFromCart = async (req, res) => {
    await CartSchema.findOneAndDelete({ user: req.profile._id, product: req.product._id })
        .exec((err, cartItem) => {
            if (err || !cartItem) {
                return res.status(400).json({
                    error: "Not Able to remove product from cartItem in DB"
                })
            }
            return res.status(200).json(cartItem)
        })
}

exports.updateQuantityInCart = async (req, res) => {
    await CartSchema.find({ user: req.profile._id, product: req.product._id })
        .populate("product", "stock")
        .exec(async (err, cartItem) => {
            if (err) {
                return res.status(400).json({
                    err: 'NOT able to get cartItem in DB !',
                });
            }
            if (cartItem.length == 0) {
                return res.status(400).json({
                    err: 'Item doesnt exists in cart !'
                });
            }
            // console.log(cartItem);
            if (req.body.quantity > cartItem[0].product.stock) {
                return res.status(400).json({
                    err: 'Item exceed current stock !'
                });
            }
            //changing quantity
            cartItem[0].Quantity = req.body.quantity

            await cartItem[0].save((err, cartItem) => {
                if (err) {
                    return res.status(400).json({
                        err: 'NOT able to save changes to cartItem in DB !',
                    });
                }
                res.status(200).json(cartItem);
            });
        })
}

exports.toggleIsSavedForLater = async (req, res) => {
    await CartSchema.find({ user: req.profile._id, product: req.product._id })
        .exec(async (err, cartItem) => {
            if (err) {
                return res.status(400).json({
                    err: 'NOT able to get cartItem in DB !',
                });
            }
            if (cartItem.length == 0) {
                return res.status(400).json({
                    err: 'Item doesnt exists in cart !'
                });
            }

            cartItem[0].isSavedForLater = !cartItem[0].isSavedForLater;

            await cartItem[0].save((err, cartItem) => {
                if (err) {
                    return res.status(400).json({
                        err: 'NOT able to save changes to cartItem in DB !',
                    });
                }
                res.status(200).json(cartItem);
            });
        })
}