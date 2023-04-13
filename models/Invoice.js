const moment = require("moment/moment");
const mongoose = require("mongoose")

const invoiceSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Please provide patient Id"]
    },

    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        requires: [true, 'Please provide category of payments']
    }],

    sub_total: {
        type: Number,
        required: [true, "Please Provide total value"],
        min: [0, "Sub-total amount cannot be negative"]
    },

    discount: {
        type: Number,
        default: 0,
        min: [0, "Discount percentage cannot be negative"],
        max: [100, 'Discount percentage cannot be more than 100']
    },
    
    tax: {
        type: Number,
        default: 0,
        min: [0, "Tax percentage cannot be negative"],
        max: [100, 'Tax percentage cannot be more than 100']
    },

    grand_total: {
        type: Number,
        required: [true, "Please provide grand-total value"],
        min: [0, "Grand-total amount cannot be negative"]
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