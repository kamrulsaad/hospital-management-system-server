const express = require('express')
const invController = require('../controllers/invoice.controller')
const paginate = require('../middlewares/paginate')
const verifyAccountant = require('../middlewares/verifyAccountant')
const verifyAdmin = require('../middlewares/verifyAdmin')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.get('/all-invoices', verifyToken, paginate, invController.getAllInvoice)

// router.post('/add-appointment/:patientId', verifyToken, apptController.addAppointment)

router.post('/create/:patientId', verifyToken, verifyAccountant, invController.createInvoice)

router.get("/qr/:invId", invController.getInvoiceQR)

router.get("/status/:invId", verifyToken, verifyAccountant, invController.updateInvoiceStatus)

router.route('/:invId')
    .get(verifyToken, invController.findInvById)
    .delete(verifyAdmin, invController.deleteInvoice)

module.exports = router