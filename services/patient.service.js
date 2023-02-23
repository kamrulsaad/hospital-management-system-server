const Patient = require("../models/Patient");
const { findUserByEmail } = require("./user.service");


exports.addNewPatientService = async (patientInfo, user) => {

    const {email} = user
        
    const {_id} = await findUserByEmail(email)

    const newPatient = {
        ...patientInfo,
        issuedBy: _id
    }

    const patient = await Patient.create(newPatient)
    return patient;
};

exports.findPatientbyId = async(_id) => {
    return await Patient.findById(_id)
}