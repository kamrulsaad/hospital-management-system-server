const Patient = require("../models/Patient");
const User = require("../models/User");


exports.addNewPatientService = async (patientInfo) => {
    return await Patient.create(patientInfo)
};

exports.findPatientbyIdService = async (_id) => {
    return await Patient.findById(_id)
}

exports.getAllPatientsService = async (pagination) => {

    const {startIndex, limit} = pagination

    const total = await Patient.countDocuments()

    const patients = await Patient.find({}).select('name phone serialId').sort({"serialId" : -1}).skip(startIndex).limit(limit);

    return {total, patients}
}