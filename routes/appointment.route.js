const express = require('express')
const apptController = require('../controllers/appointment.controller')
const paginate = require('../middlewares/paginate')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.get('/all-appointments', verifyToken, paginate, apptController.allAppointments)

router.get('/:apptId', verifyToken, apptController.findApptById)

router.post('/new-appointment/:patientId', verifyToken, apptController.addAppointment)

module.exports = router