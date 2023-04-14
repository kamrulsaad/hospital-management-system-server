const Patient = require("../models/Patient");


exports.addNewPatientService = async (patientInfo) => {
    return await Patient.create(patientInfo)
};

exports.findPatientbyIdService = async (_id) => {
    return await Patient.findById(_id).populate([{
        path: "appointments",
        select: "reason paymentCompleted createdAt serialId",
    }, {
        path: "invoices",
        select: "sub_total grand_total createdAt serialId",
    }])
}

exports.getAllPatientsService = async (pagination) => {

    const {startIndex, limit} = pagination

    const total = await Patient.countDocuments()

    const patients = await Patient.find({}).select('name phone serialId age').sort({"serialId" : -1}).skip(startIndex).limit(limit);

    return {total, patients}
}

exports.deletePatientService = async (_id) => {
    await Patient.deleteOne({_id})
}