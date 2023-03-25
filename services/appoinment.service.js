const Appointment = require("../models/Appointment")
const Patient = require("../models/Patient")
const { findPatientbyIdService } = require("./patient.service")
const { findUserByEmailService } = require("./user.service")

exports.addAppoinmentService = async (apptinfo, user) => {

    const { email } = user

    const issuedBy = await findUserByEmailService(email)

    const { patient: _id } = apptinfo

    const patient = await findPatientbyIdService(_id)

    console.log(patient)

    apptinfo = { ...apptinfo, patient, issuedBy }

    const appointment = await Appointment.create(apptinfo)

    await Patient.updateOne({ _id }, { $push: { appointments: appointment._id } })

    return appointment
}

exports.allApptService = async (pagination) => {

    const { startIndex, limit } = pagination

    const total = await Appointment.countDocuments()

    const appointments = await Appointment.find({}).populate({
        path: "patient",
        select: "name phone serialId -_id"
    }).select("reason serialId _id paymentCompleted").sort({"serialId" : -1}).skip(startIndex).limit(limit);

    return { appointments, total }
}

exports.myApptService = async (pagination, appointed_to) => {

    const { startIndex, limit } = pagination

    const total = await Appointment.find({ appointed_to }).countDocuments()

    const appointments = await Appointment.find({ appointed_to }).populate({
        path: "patient",
        select: "name phone -_id"
    }).select("reason serialId").skip(startIndex).limit(limit);

    return { appointments, total }
}

exports.apptByIdService = async (id) => {
    return await Appointment.findById(id).populate({
        path: "patient",
        select: "name phone serialId -_id"
    }).select("reason")
}

exports.updateApptService = async (_id, info) => {
    return await Appointment.updateOne({ _id }, { $set: info })
}

exports.deleteApptIdService = async (_id) => {
    return await Appointment.deleteOne({_id})
}