const express = require('express')
const verifyAdmin = require('../middlewares/verifyAdmin')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const categoryController = require('../controllers/category.controller')

router.get('/all', verifyToken, categoryController.allCategory)

router.post('/create', verifyAdmin, categoryController.createCategory)

router.route('/:categoryId')
.delete(verifyAdmin, categoryController.deleteCategory)
.post(verifyAdmin, categoryController.updateCategory)

module.exports = router