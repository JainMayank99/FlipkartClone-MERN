const UserSchema = require('../models/user')

exports.addAddress = async (req, res) => {

    if (req.body.address == undefined || req.body.address.length == 0) {
        return res.status(400).json({
            err: 'Invalid Address!',
        });
    }

    await UserSchema.findById({ _id: req.profile._id },
        async (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'Error in saving address in DB!',
                    // err
                });
            }
            if (!user) {
                return res.status(400).json({
                    error: 'User does not exist',
                });
            }

            // console.log(user);
            // console.log(user[0].address);
            // console.log(user[0].address.addresses);

            let newAddress = req.body.address

            if (user.address.addresses.includes(newAddress)) {
                return res.status(400).json({
                    msg: 'Duplicate address added',
                });
            }

            if (user.address.addresses.length === 0) {
                user.address.defaultAddress = newAddress
                user.address.addresses.push(newAddress)
            } else {
                user.address.addresses.push(newAddress)
            }

            await user.save((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Error in saving address in DB!',
                    });
                }
                res.status(200).json(user);
            })

        }
    )
}

exports.removeAddress = async (req, res) => {
    if (req.body.address == undefined || req.body.address.length == 0) {
        return res.status(400).json({
            err: 'Invalid Address!',
        });
    }

    await UserSchema.findById({ _id: req.profile._id },
        async (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'Error in saving address in DB!'
                });
            }
            if (!user) {
                return res.status(400).json({
                    error: 'User does not exist',
                });
            }

            let index = user.address.addresses.indexOf(req.body.address)
            if (index > -1) {

                user.address.addresses.splice(index, 1);

                if (user.address.addresses.length === 0) {
                    user.address.defaultAddress = "";
                } else {
                    if (user.address.defaultAddress === req.body.address) {
                        user.address.defaultAddress = user.address.addresses[0]
                    }
                }

            } else {
                return res.status(400).json({
                    error: 'Address not present in DB',
                });
            }

            await user.save((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Error in saving address in DB!',
                    });
                }
                res.status(200).json(user.address.addresses);
            })
        }
    )
}

exports.getAllAddresses = async (req, res) => {
    await UserSchema.findById({ _id: req.profile._id },
        async (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'Error in saving address in DB!'
                });
            }
            if (!user) {
                return res.status(400).json({
                    error: 'User does not exist',
                });
            }

            return res.status(200).json(user.address.addresses)
        }
    )
}

exports.changeDefaultAddress = async (req, res) => {
    await UserSchema.findById({ _id: req.profile._id },
        async (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'Error in saving address in DB!'
                });
            }
            if (!user) {
                return res.status(400).json({
                    error: 'User does not exist',
                });
            }

            let newAddress = req.body.address
            if (!user.address.addresses.includes(newAddress)) {
                return res.status(400).json({
                    error: 'Address does not exist in DB',
                });
            }
            user.address.defaultAddress = newAddress;

            await user.save((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Error in saving address in DB!',
                    });
                }
                res.status(200).json({
                    "defaultAddress": user.address.defaultAddress
                });
            })
        })
}