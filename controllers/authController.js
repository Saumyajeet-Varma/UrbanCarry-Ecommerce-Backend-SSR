const bcrypt = require('bcrypt')

const userModel = require('../models/userModel.js')
const { generateToken } = require('../utils/generateToken.js')

module.exports.registerUser = async (req, res) => {

    try {
        const { fullname, email, password } = req.body;

        const userExist = await userModel.findOne({ email })

        if (userExist) {
            req.flash("error", "You already have an account, please login")
            return res.status(401).redirect("/register")
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_ROUNDS || 10));

        const createdUser = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
        })

        const token = generateToken(createdUser)

        res.cookie("token", token).redirect("/shop")
    }
    catch (err) {
        res.send(err.message)
    }
}

module.exports.loginUser = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            req.flash("error", "Email or password is incorrect")
            return res.redirect('/')
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            req.flash("error", "Email or password is incorrect")
            return res.redirect('/')
        }

        const token = generateToken(user)

        res.cookie("token", token).redirect("/shop")
    }
    catch (err) {
        res.send(err.message)
    }
}

module.exports.logoutUser = (req, res) => {

    res.cookie("token", "").redirect('/')
}