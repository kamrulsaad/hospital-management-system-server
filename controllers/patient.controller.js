const { addNewPatientService } = require("../services/patient.service")

exports.addNewPatient = async (req, res) => {
    try {

        const patient = await addNewPatientService(req.body, req.user)

        patient.save()

        res.status(200).json({
            status: 'success',
            message: "ALL OK",
            data: patient
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        })
    }

}