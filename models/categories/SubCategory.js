const { default: mongoose } = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true,
    },
    mainCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'MainCategory',
        required: true,
    },
    charge: {
        type: Number,
        required: [true, 'Please add a charge'],
        min: 0,
    },
    pcRate: {
        type: Number,
        required: [true, 'Please add a PC rate'],
        min: 0,
        max: 100,
    },
    type: {
        type: String,
        enum: ['main', 'description', "file"],
        default: 'main',
    },
    file_url: String,
    image_url: String,
    normalValue: {
        type: String,
        required: [true, 'Please add a normal values'],
        trim: true,
    },
});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = SubCategory;

