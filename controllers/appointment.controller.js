const { addAppoinmentService, allApptService, apptByIdService } = require("../services/appoinment.service")

exports.addAppointment = async (req, res) => {
    try {

        const { patientId } = req.params

        req.body.patient = patientId

        const appointment = await addAppoinmentService(req.body)

        appointment.save()

        res.status(200).json({
            status: "success",
            message: 'Appointment is booked',
            data: appointment
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        })
    }
}

exports.allAppointments = async (req, res) => {
    try {
        const appointments = await allApptService()

        res.status(200).json({
            status: "success",
            message: 'All appointments',
            data: appointments
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
            error
        })
    }
}