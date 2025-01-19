const express = require('express');
const app = express();

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

const PORT = 3000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})