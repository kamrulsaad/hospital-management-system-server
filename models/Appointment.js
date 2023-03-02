const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    disease: {
        type: String,
        required: [true, "Please provide a disease name"],
        trim: true
    },

    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

    diagnosis: {
        type: String,
        trim: true,
    },

    medicines: [
        {
            name: String,
            dosage: String
        }
    ],

    followUp: Date,

    appointed_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    payment: {
        type: Number,
        required: [true, "Please insert the amount paid by patient"]
    },
    tests: [String]

}, {
    timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment