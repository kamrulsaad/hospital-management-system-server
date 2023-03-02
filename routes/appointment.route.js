const express = require('express')
const apptController = require('../controllers/appointment.controller')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.get('/:apptId', verifyToken, apptController.findApptById)

router.get('/all-appointments', verifyToken, apptController.allAppointments)

router.post('/new-appointment/:patientId', verifyToken, apptController.addAppointment)

module.exports = router