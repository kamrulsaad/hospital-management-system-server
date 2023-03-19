const Appointment = require("../models/Appointment")
const Patient = require("../models/Patient")
const { findPatientbyIdService } = require("./patient.service")
const { findUserByEmailService } = require("./user.service")

exports.addAppoinmentService = async (apptinfo, user) => {

    const {email} = user

    const issuedBy = await findUserByEmailService(email)

    const { patient: _id } = apptinfo

    const patient = await findPatientbyIdService(_id)

    apptinfo = { ...apptinfo, patient, issuedBy }

    const appointment = await Appointment.create(apptinfo)

    await Patient.updateOne({ _id }, { $push: { appointments: appointment._id } })

    return appointment
}

exports.allApptService = async (pagination) => {

    const {startIndex, limit} = pagination

    const total = await Appointment.countDocuments()

    const appointments = await Appointment.find({}).populate({
        path: "patient",
        select: "name phone"
    }).select("disease").skip(startIndex).limit(limit);

    return { appointments, total}
}

exports.apptByIdService = async (id) => {
    return await Appointment.findById(id).populate("patient")
}