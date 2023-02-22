const express = require('express');
const cors = require('cors');
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// routes
const userRoute = require("./routes/user.route");
const patientRoute = require('./routes/patient.route');

app.get("/", (req, res) => {
    res.send("<h1>Hello from HMS server made by UNIECH</h1>")
})

app.use("/api/v1/user", userRoute);
app.use("/api/v1/patient", patientRoute);

module.exports = app