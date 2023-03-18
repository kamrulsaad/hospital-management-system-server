const express = require('express');
const cors = require('cors');
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// routes
const userRoute = require("./routes/user.route");
const patientRoute = require('./routes/patient.route');
const apptRoute = require('./routes/appointment.route');


app.get("/", (req, res) => {
    res.send("Hello from HMS server made by UNIECH")
})

app.use("/api/v1/user", userRoute);
app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/appointment", apptRoute);

module.exports = app