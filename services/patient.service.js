const Patient = require("../models/Patient");
const User = require("../models/User");
const { findUserByEmail } = require("./user.service");


exports.addNewPatientService = async (patientInfo, user) => {

    const {email} = user
        
    const issuedBy = await findUserByEmail(email)

    
    const newPatient = {
        ...patientInfo,
        issuedBy
    }
    
    const patient = await Patient.create(newPatient)

    const res = await User.updateOne({_id: issuedBy._id}, {$push: {patiendAdded: patient._id}})

    console.log(res);

    return patient;
};

exports.findPatientbyId = async(_id) => {
    return await Patient.findById(_id)
}

exports.getAllPatientsService = async () => {
    return await Patient.find({}).populate("issuedBy")
}