


exports.isSeller = (req, res, next) => {
    // console.log(req.profile);
    if (req.profile.role != 1) {
        return res.status(400).json({
            error: "User not a seller"
        })
    }
    next();
}