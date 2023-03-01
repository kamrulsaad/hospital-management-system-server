const Appointment = require("../models/Appointment")
const { findPatientbyId } = require("./patient.service")

exports.addAppoinmentService = async (apptinfo) => {

    const patient = await findPatientbyId(apptinfo.patientId)

    apptinfo = { ...apptinfo, patient }
    
    const appointment = await Appointment.create(apptinfo)
    
    return appointment
}