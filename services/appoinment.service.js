const Appointment = require("../models/Appointment")
const Patient = require("../models/Patient")
const Doctor = require('../models/User')
const { findPatientbyIdService } = require("./patient.service")

exports.addAppoinmentService = async (apptinfo) => {

    const { patient: _id } = apptinfo

    const patient = await findPatientbyIdService(_id)

    apptinfo = { ...apptinfo, patient }

    const appointment = await Appointment.create(apptinfo)

    await Doctor.updateOne({ _id: appointment.appointed_to }, { $push: { appointments: appointment._id } })

    await Patient.updateOne({ _id }, { $push: { appointments: appointment._id } })

    return appointment
}

exports.allApptService = async (req, res) => {
    return await Appointment.find({}).populate({
        path: "patient",
        select: "name phone"
    }).select("disease")
}