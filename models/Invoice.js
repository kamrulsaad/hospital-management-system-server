const moment = require("moment/moment");
const mongoose = require("mongoose")

const invoiceSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Please provide patient Id"]
    },

    payments: {
        tests: [{
            test: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubCategory',
            },
            pcCommision: {
                type: Number,
                default: 0,
                min: [0, "Amount cannot be negative"]
            },
        }],
    },

    sub_total: {
        type: Number,
        required: [true, "Please Provide total value"],
        min: [0, "Sub-total amount cannot be negative"],
    },

    discount: {
        type: Number,
        default: 0,
        min: [0, "Discount value cannot be negative"],
    },

    VAT: {
        type: Number,
        default: 0,
        min: [0, "VAT percentage cannot be negative"],
        max: [100, 'VAT percentage cannot be more than 100']
    },

    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PC",
    },

    total_PC_Commission: {
        type: Number,
        min: [0, "Total PC Commission cannot be negative"],
        validate: function () {
            let total = 0;
            this.payments.forEach((payment) => {
                total += payment.pcCommision;
            });
            return total === this.total_PC_Commission;
        }
    },

    grand_total: {
        type: Number,
        required: [true, "Please provide grand-total value"],
        min: [0, "Grand-total amount cannot be negative"],
        validate: {
            validator: function () {
                const grand_total = this.sub_total - this.discount + ((this.sub_total * this.VAT) / 100);
                return grand_total === this.grand_total;
            },
            message:
                "Grand-total value is incorrect. Please ensure that it is calculated correctly.",
        },
    },

    serialId: {
        type: String,
        unique: true
    },

    paymentCompleted: {
        type: Boolean,
        default: false
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
})

invoiceSchema.pre("save", function (next) {

    let doc = this

    if (this.isNew) {

        let currentDate = moment().format('YYMMDD');

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