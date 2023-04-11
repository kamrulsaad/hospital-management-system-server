const express = require('express')
const verifyAdmin = require('../middlewares/verifyAdmin')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const categoryController = require('../controllers/category.controller')

router.get('/all', verifyToken, categoryController.createCategory)

router.post('/create', verifyAdmin, categoryController.createCategory)

// router.route('/:invId')
// .get(verifyToken, invController.findInvById)
// .delete(verifyAdmin, invController.deleteInvoice)

module.exports = router