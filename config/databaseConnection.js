const mongoose = require("mongoose");

require('dotenv').config()

mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    .then(() => {
        console.log("Connected")
    })
    .catch(err => {
        console.log(`ERROR : (${err.message})\n${err}`)
    })

module.exports = mongoose.connection;