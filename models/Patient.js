const mongoose = require('mongoose');
const validator = require("validator");

const patientSchema = mongoose.Schema(
    {
        phone: {
            type: String,
            required: [true, "Please provide patient's phone number."],
            trim: true,
            unique: [true, "There already exists an account with {VALUE}"],
            validate: [validator.isMobilePhone, "Please provide a valid contact number"],
        },

        email: {
            type: String,
            validate: [validator.isEmail, "Please provide a valid Email"],
            trim: true,
            lowercase: true,
        },

        firstName: {
            type: String,
            required: [true, "Please provide a first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        lastName: {
            type: String,
            required: [true, "Please provide a last name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },

        emergency_contact: {
            name: {
                type: String,
                trim: true
            },
            phone: {
                type: String,
                required: [true, "Please provide an emergency contact number."],
                trim: true,
                unique: [true, "There already exists an account with {VALUE}"],
                validate: [validator.isMobilePhone, "Please provide a valid contact number"],
            },
            relation: String
        },

        appointments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment',
            default: undefined
        }],

        issuedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient