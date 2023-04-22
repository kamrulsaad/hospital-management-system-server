const Patient = require("../models/Patient")
const User = require("../models/User")

module.exports = async (req, res) => {
    try {
        const [totalPatientsCount, totalDoctorsCount, newPatientsCount, newPatients] = await Promise.all([
            Patient.find().countDocuments(),
            User.find({ role: 'doctor' }).countDocuments(),
            Patient.find({ createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } }).countDocuments(),
            Patient.find({ createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } }, {
                name: 1, phone: 1, createdAt: 1, serialId: 1
            }).sort({ "serialId": -1 }).limit(5)
        ])

        res.status(200).json({
            status: 'success',
            message: "Dashboard data",
            data: {
                totalPatientsCount,
                totalDoctorsCount,
                newPatientsCount,
                newPatients
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            error: err.message
        })
    }
}