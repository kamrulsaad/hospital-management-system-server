const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please mention the type of payment"]
    },
    amount: {
        type: Number,
        required: [true, "Please provide the amount to pay"],
        min: [0, "Amount cannot be a negative value"]
    }
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category