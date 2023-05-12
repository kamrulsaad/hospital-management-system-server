const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const testSchema = mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
        file_url: String,
        result: String,
        pcCommission: Number,
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
        },
        serialId: {
            type: Number,
            unique: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        available: {
            type: Boolean,
            default: false
        },
        remarks: String
    },
    {
        timestamps: true,
    }
);

testSchema.plugin(AutoIncrement, { id: 'serialId_seq', inc_field: 'serialId' });

const Test = mongoose.model("Test", testSchema)

module.exports = Test