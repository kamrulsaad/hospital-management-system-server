const Appointment = require("../models/Appointment")
const { findPatientbyId } = require("./patient.service")

exports.addAppoinmentService = async(info) => {

    const patient = await findPatientbyId(info.patientId)

    info = {...info, patient}

    const appointment = await Appointment.create(info)
    return appointment
}