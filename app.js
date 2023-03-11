const express = require('express');
const cors = require('cors');
const app = express()
const logger = require('./utils/logger');

// middlewares
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    let oldData = res.send
    res.send = function (data) {
        logger.info(JSON.parse(data))
        oldData.apply(res, arguments)
    }
    next()
})

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