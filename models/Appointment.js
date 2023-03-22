const moment = require("moment/moment");
const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    reason: {
        type: String,
        required: [true, "Please provide a reason for patient's visit"],
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

    serialId: {
        type: String,
        unique: true
    },

    paymentCompleted: {
        type: Boolean,
        required: [true, "Please provide patients payment information"]
    },
    
    tests: [String]

}, {
    timestamps: true
})

appointmentSchema.pre("save", function (next) {

    let doc = this

    if (this.isNew) {

        let currentDate = moment().format('YYYYMMDD');

        mongoose.model('Appointment').findOne({
            serialId: { $regex: ('^' + currentDate) }
        },
            {},
            { sort: { 'serialId': -1 } },
            function (err, lastUser) {
                if (err) {
                    return next(err);
                }
                let serialNumber = currentDate + '00001';
                if (lastUser) {
                    let lastSerialNumber = parseInt(lastUser.serialId.substring(8), 10);
                    serialNumber = currentDate + ('00000' + (lastSerialNumber + 1)).slice(-5);
                }
                doc.serialId = serialNumber;
                next();
            });
    } else {
        next();
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment