const Patient = require("../models/Patient");
const User = require("../models/User");


exports.addNewPatientService = async (patientInfo) => {
    return await Patient.create(patientInfo)
};

exports.findPatientbyIdService = async (_id) => {
    return await Patient.findById(_id)
}

exports.getAllPatientsService = async () => {
    return await Patient.find({}).select('name phone')
}