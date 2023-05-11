const express = require('express')
const router = express.Router()
const subCatController = require('../../controllers/category/sub_category.controller')
const verifyToken = require('../../middlewares/verifyToken')

router.use(verifyToken)

// router.get('/all', verifyToken, categoryController.allCategory)

router.post('/create', subCatController.createSubCategory)

// router.route('/:categoryId')
// .delete(verifyAdmin, categoryController.deleteCategory)
// .post(verifyAdmin, categoryController.updateCategory)

module.exports = router