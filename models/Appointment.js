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

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
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

    payment: {
        type: Number,
        required: [true, "Please insert the value paid by patient"]
    },
    tests: [String]

}, {
    timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment