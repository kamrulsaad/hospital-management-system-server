const { addNewPatientService, getAllPatientsService, findPatientbyIdService } = require("../services/patient.service")

exports.addNewPatient = async (req, res) => {
    try {

        const patient = await addNewPatientService(req.body)

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

exports.getPatientById = async (req, res) => {
    try {
        const { patientId } = req.params
        const patient = await findPatientbyIdService(patientId)
        res.status(200).json({
            status: 'success',
            message: "Patient info",
            data: patient
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: "Internal server error"
        })
    }
}