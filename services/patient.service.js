const Patient = require("../models/Patient");
const User = require("../models/User");
const { findUserByEmailService } = require("./user.service");


exports.addNewPatientService = async (patientInfo, user) => {

    const { email } = user

    const issuedBy = await findUserByEmailService(email)

    const newPatient = {
        ...patientInfo,
        issuedBy
    }

    const patient = await Patient.create(newPatient)

    await User.updateOne({ _id: issuedBy._id }, { $push: { patientAdded: patient._id } })

    return patient;
};

exports.findPatientbyIdService = async (_id) => {
    return await Patient.findById(_id)
}

exports.getAllPatientsService = async () => {
    return await Patient.find({}).select('name phone')
}