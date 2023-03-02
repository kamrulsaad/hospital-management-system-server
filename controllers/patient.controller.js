const { addNewPatientService, getAllPatientsService } = require("../services/patient.service")

exports.addNewPatient = async (req, res) => {
    try {

        const patient = await addNewPatientService(req.body, req.user)

        patient.save()

        res.status(200).json({
            status: 'success',
            message: "Patient registration successful",
            data: patient
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        })
    }

}

exports.getAllPatients = async (req, res) => {
    try {

        const patients = await getAllPatientsService()
        res.status(200).json({
            status: 'success',
            message: "All Patient info",
            data: patients
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: "Internal server error"
        })
    }
}