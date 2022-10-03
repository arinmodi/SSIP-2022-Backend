const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routes");
const multer = require("multer");
const { errorHandler } = require("./helpers/errors");

require("./database/dbConnection");

app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())

app.use("/", routes);

// Home route
app.get("/", (_req, res) => {
	res.status(200).json({ message: "Hello There!! You are at Backend" });
});


app.use(errorHandler);


app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({
            err_message: err.message,
        });
    }
});

// handle the error safely
process.on("uncaughtException", (err) => {
	console.log(err);
});

module.exports = app;