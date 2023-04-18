const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for the test"],
        trim: true,
    },
    file_url: String,
    amount: {
        type: Number,
        min: [0, "Amount cannot be a negative value"],
        required: [true, "Please provide the amount to pay"],
    },
    paymentCompleted: {
        type: Boolean,
        required: [true, "Please provide patients payment information"],
    },
    reportAvailable: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

testSchema.pre('save', function (next) {
    if (this.file_url && !this.reportAvailable) {
        this.reportAvailable = true;
    }
    next();
});


const Test = mongoose.model("Test", testSchema);

module.exports = Test;