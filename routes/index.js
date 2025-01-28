const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middlewares/isLoggedIn')
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')

router.get("/", (req, res) => {
    const error = req.flash("error")
    res.render("index", { error })
})

router.get("/register", (req, res) => {
    const error = req.flash("error")
    res.render("register", { error })
})

router.get("/shop", isLoggedIn, async (req, res) => {

    const products = await productModel.find()

    const success = req.flash("success")

    res.render("shop", { products, success })
})

router.get("/cart", isLoggedIn, async (req, res) => {

    const user = await userModel.findOne({ email: req.user.email }).populate("cart")

    let sum = 0

    res.render("cart", { user, sum })
})

router.get("/addToCart/:productId", isLoggedIn, async (req, res) => {

    const user = await userModel.findOne({ email: req.user.email })

    user.cart.push(req.params.productId)
    await user.save()

    req.flash("success", "Added to cart")
    res.redirect("/shop")
})

module.exports = router