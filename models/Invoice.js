const moment = require("moment/moment");
const mongoose = require("mongoose")

const invoiceSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    payments: [{
        name: {
            type: String,
            required: [true, "Please provide payment option name"]
        },
        amount: {
            type: Number,
            required: [true, 'Please provide payment amount!'],
            min: [1, "Payment value cannot be less than or equal to zero"]
        },
    }],

    total: {
        type: Number
    },

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

    let payments = this.payments

    let total = 0;

    for(const p of payments){
        total+= p.amount
    }

    this.total = total

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