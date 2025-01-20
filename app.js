const express = require('express');
const app = express();

require('dotenv').config()

const cookieParser = require('cookie-parser');
const path = require('path')

const db = require("./config/databaseConnection")
const usersRouter = require("./routes/usersRouter")
const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/users", usersRouter)
app.use("/owners", ownersRouter)
app.use("/products", productsRouter)

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT || 3000}`)
})