const Patient = require("../models/Patient");
const { findUserByEmail } = require("./user.service");


exports.addNewPatientService = async (patientInfo, user) => {

    const {email} = user
        
    const issuedBy = await findUserByEmail(email)

    const newPatient = {
        ...patientInfo,
        issuedBy
    }

    const patient = await Patient.create(newPatient)
    return patient;
};

exports.findPatientbyId = async(_id) => {
    return await Patient.findById(_id)
}