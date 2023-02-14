const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = require("./app")

mongoose.connect(process.env.DB_LOCAL).then(()=>{
    console.log("Database is connected")
})

const port = process.env.PORT || 8800

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})