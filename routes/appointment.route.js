const express = require('express')
const apptController = require('../controllers/appointment.controller')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.post('/new-appointment/:patientId', verifyToken, apptController.addAppointment)

module.exports = router