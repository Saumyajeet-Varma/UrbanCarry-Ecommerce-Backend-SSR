const express = require('express')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const router = express.Router()

router.get("/", (req, res) => {
    // const error = req.flash("error")
    // res.render("index", { error })
    res.render("index")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.get("/shop", isLoggedIn, (req, res) => {
    res.render("shop")
})

module.exports = router