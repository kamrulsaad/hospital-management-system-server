const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const moment = require('moment/moment');

const userSchema = mongoose.Schema(
    {
        phone: {
            type: String,
            required: [true, "Please provide your phone number."],
            trim: true,
            unique: [true, "There exists an account already with {VALUE}"],
            validate: [validator.isMobilePhone, "Please provide a valid contact number"],
        },

        password: {
            type: String,
            required: [true, "Please provide a strong password."],
            validate: {
                validator: (value) =>
                    validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 1,
                        minNumbers: 1,
                        minUppercase: 1,
                        minSymbols: 1,
                    }),
                message: "Password is not strong enough.",
            },
        },

        email: {
            type: String,
            validate: [validator.isEmail, "Please provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: [true, "There exists an account already with {VALUE}"],
            required: [true, "Email address is required"],
        },

        role: {
            type: String,
            enum: ["doctor", "admin", "super-admin", "receptionist", "accountant"],
            required: [true, "Please provide a role for your organization."]
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
            required: [true, "Please provide a first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },


        imageURL: {
            type: String,
            validate: [validator.isURL, "Please provide a valid url"],
        },

        status: {
            type: String,
            default: "inactive",
            enum: ["active", "inactive", "blocked"],
        },

        confirmationToken: String,
        confirmationTokenExpires: Date,

        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        // passwordChangedAt: Date,
        // passwordResetToken: String,
        // passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
);


userSchema.pre("save", function (next) {

    if (!this.isModified("password")) {
        //  only run if password is modified, otherwise it will change every time we save the user!
        return next();
    }

    const hashedPassword = bcrypt.hashSync(this.password);
    this.password = hashedPassword;

    next();
});

userSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
};

userSchema.methods.updatePass = function (password) {
    return bcrypt.hashSync(password)
}

const User = mongoose.model("User", userSchema)

module.exports = User