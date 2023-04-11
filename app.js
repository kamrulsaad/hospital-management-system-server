const express = require('express');
const cors = require('cors');
const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use('/images', express.static('images'));

// routes
const userRoute = require("./routes/user.route");
const patientRoute = require('./routes/patient.route');
const apptRoute = require('./routes/appointment.route');
const invRoute = require('./routes/inoive.route');
const categoryRoute = require('./routes/category.route')


app.get("/", (req, res) => {
    res.send("Hello from HMS server made by UNIECH")
})

app.use("/api/v1/user", userRoute);
app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/appointment", apptRoute);
app.use("/api/v1/invoice", invRoute);
app.use("/api/v1/category", categoryRoute);

module.exports = app