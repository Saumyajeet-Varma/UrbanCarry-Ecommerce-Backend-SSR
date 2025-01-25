const express = require('express')
const router = express.Router()
const ownerModel = require("../models/ownerModel")

// router.get("/", (req, res) => {
//     res.send("Owner")
// })

router.get("/admin", (req, res) => {
    res.render("admin")
})

router.get("/admin/createProduct", (req, res) => {
    const success = req.flash("success");
    res.render("createProduct", { success })
})

// ? This should be development route
router.post("/create", async (req, res) => {

    const owners = await ownerModel.find()

    if (owners.length > 0) {
        return res.status(303).send("You dont have permission to create a new owner")
    }

    const { fullname, email, password } = req.body;

    const createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    })

    res.status(201).send(createdOwner)
})

module.exports = router