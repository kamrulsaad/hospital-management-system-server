const { addAppoinmentService } = require("../services/appoinment.service")

exports.addAppointment = async (req, res) => {
    try {

        const { patientId } = req.params

        req.body.patientId = patientId

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