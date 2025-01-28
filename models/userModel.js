const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ],
    orders: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    contact: Number,
    image: String
})

module.exports = mongoose.model("user", userSchema)