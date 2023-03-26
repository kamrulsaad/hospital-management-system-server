const moment = require("moment/moment");
const mongoose = require("mongoose")

const invoiceSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    amount: {
        type: Number,
        min: [1, "Amount cannot be less than or equal to zero"],
        required: [true, "Please provide the total amount paid by Patient"]
    },

    options: [{
        type: String,
        trim: true,
    }],

    serialId: {
        type: String,
        unique: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    }

}, {
    timestamps: true
})

invoiceSchema.pre("save", function (next) {

    let doc = this

    if (this.isNew) {

        let currentDate = moment().format('YYYYMMDD');

        mongoose.model('Invoice').findOne({
            serialId: { $regex: ('^' + currentDate) }
        },
            {},
            { sort: { 'serialId': -1 } },
            function (err, lastUser) {
                if (err) {
                    return next(err);
                }
                let serialNumber = currentDate + "INV" + '00001';
                if (lastUser) {
                    let lastSerialNumber = parseInt(lastUser.serialId.substring(12), 10);
                    serialNumber = currentDate + "INV" + ('00000' + (lastSerialNumber + 1)).slice(-5);
                }
                doc.serialId = serialNumber;
                next();
            });
    } else {
        next();
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice