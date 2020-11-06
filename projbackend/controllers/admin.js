exports.isAdmin = (req, res, next) => {
    if (req.profile.role != 2) {
        return res.status(400).json({
            error: "User not a admin"
        })
    }
    next();
}

