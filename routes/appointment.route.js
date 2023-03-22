const express = require('express')
const apptController = require('../controllers/appointment.controller')
const paginate = require('../middlewares/paginate')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.get('/all-appointments', verifyToken, paginate, apptController.allAppointments)

router.get('/my-appointments', verifyToken, paginate, apptController.myAppointments)

router.route('/:apptId')
.get(verifyToken, apptController.findApptById)
.post(verifyToken, apptController.updateApptInfo)

router.post('/:patientId', verifyToken, apptController.addAppointment)

module.exports = router