const express = require('express')
const router = express.Router()
const expController = require('../controllers/expense.controller')
const paginate = require('../middlewares/paginate')
const verifyAccountant = require('../middlewares/verifyAccountant')
const verifyAdmin = require('../middlewares/verifyAdmin')
const verifyToken = require('../middlewares/verifyToken')

router.post("/category/create", verifyAdmin, expController.createExpenseCategory)

router.get('/category/all', verifyToken, paginate, expController.getAllExpenseCategories)

module.exports = router