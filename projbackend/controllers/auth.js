const UserSchema = require('../models/user');
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    const user = new UserSchema(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: 'NOT able to save user in DB !',
            });
        }
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        });
    });
};

exports.signin = (req, res) => {
    const { phone, email, password } = req.body;
    const errors = validationResult(req);

    if (email != null && phone != null && email.length === 0 && phone.toString().length === 0) {
        return res.status(401).json({
            msg: 'Enter Your Email or Phone',
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
                return res.status(400).json({
                    msg: 'DB Error !',
                });
            }

            if (!user) {
                return res.status(400).json({
                    msg: 'User phone number not found !',
                });
            }

            //checking for password from DB
            if (!user.authenticate(password)) {
                if (password.length === 0) {
                    return res.status(401).json({
                        msg: 'Enter Your Password !',
                    });
                } else {
                    return res.status(401).json({
                        msg: 'Phone and Password does not match !',
                    });
                }
            }

            //Signin the user by
            //Create the token put it in Cookie
            //Creating Token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            //Put Token in Cookie
            res.cookie('token', token, { expire: new Date() + 9999 });

            //sending response to frontEnd
            const { _id, name, email, phone } = user;
            return res.json({
                token,
                user: {
                    _id,
                    name,
                    email,
                    phone
                },
            });
        });
    }
    else {
        UserSchema.findOne({ email }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    msg: 'DB Error !',
                });
            }

            if (!user) {
                return res.status(400).json({
                    msg: 'User email not found !',
                });
            }

            //checking for password from DB
            if (!user.authenticate(password)) {
                if (password.length === 0) {
                    return res.status(401).json({
                        msg: 'Enter Your Password !',
                    });
                } else {
                    return res.status(401).json({
                        msg: 'Email and Password does not match !',
                    });
                }
            }

            //Signin the user by
            //Create the token put it in Cookie
            //Creating Token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            //Put Token in Cookie
            res.cookie('token', token, { expire: new Date() + 9999 });

            //sending response to frontEnd
            const { _id, name, email, phone } = user;
            return res.json({
                token,
                user: {
                    _id,
                    name,
                    email,
                    phone
                },
            });
        });
    }
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'User Signout Successful',
    });
};

//Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth',
});

//custom MiddleWares
//req.profile is set up by frontend and also by getUserById controller
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
        return res.status(403).json({
            error: 'Access Denied',
        });
    }
    next();
};