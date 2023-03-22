const { addAppoinmentService, allApptService, apptByIdService, myApptService } = require("../services/appoinment.service")
const { findUserByEmailService } = require("../services/user.service")

exports.addAppointment = async (req, res) => {
    try {

        const { patientId } = req.params

        req.body.patient = patientId

        const appointment = await addAppoinmentService(req.body, req.user)

        appointment.save()

        const { issuedBy, ...others } = appointment.toObject()

        res.status(200).json({
            status: "success",
            message: 'Appointment is booked',
            data: others
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

exports.allAppointments = async (req, res) => {
    try {

        const { page, limit, startIndex, endIndex } = req.pagination;

        const { appointments, total } = await allApptService(req.pagination)

        res.status(200).json({
            status: "success",
            message: 'All appointments',
            data: appointments,
            page, limit, startIndex, endIndex, total
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        })
    }
}

exports.findApptById = async (req, res) => {
    try {
        const appointment = await apptByIdService(req.params.apptId)

        res.status(200).json({
            status: "success",
            data: appointment
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

exports.myAppointments = async (req, res) => {
    try {

        const { page, limit, startIndex, endIndex } = req.pagination;

        const { _id } = await findUserByEmailService(req.user.email)

        const { appointments, total } = await myApptService(req.pagination, _id)

        res.status(200).json({
            status: "success",
            message: 'My appointments',
            data: appointments.length > 0 ? appointments : "No data found",
            page, limit, startIndex, endIndex, total
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}