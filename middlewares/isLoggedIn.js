const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')

module.exports.isLoggedIn = async (req, res, next) => {

    if (!req.cookies.token) {
        req.flash("error", "You need to login first")
        return res.redirect('/')
    }

    try {
        const tokenData = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

        const user = await userModel.findOne({ email: tokenData.email }).select("-password")

        req.user = user;

        next();
    }
    catch (err) {
        req.flash("error", "Something went wrong.")
        res.redirect('/')
    }
}