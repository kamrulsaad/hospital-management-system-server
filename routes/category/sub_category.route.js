const express = require('express')
const router = express.Router()
const subCatController = require('../../controllers/category/sub_category.controller')
const verifyToken = require('../../middlewares/verifyToken')
const paginate = require('../../middlewares/paginate')

router.use(verifyToken)

router.get('/all', paginate, subCatController.allCategory)

router.post('/create', subCatController.createSubCategory)

// router.route('/:categoryId')
// .delete(verifyAdmin, subCatController.deleteCategory)
// .post(verifyAdmin, subCatController.updateCategory)

module.exports = router