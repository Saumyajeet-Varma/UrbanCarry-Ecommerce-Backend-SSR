const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middlewares/isLoggedIn')
const productModel = require('../models/productModel')

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

    res.render("shop", { products })
})

module.exports = router