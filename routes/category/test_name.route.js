const express = require('express');
const { createTestName, updateTestName, deleteTestName } = require('../../controllers/category/test_name.controller');
const verifyToken = require('../../middlewares/verifyToken');
const router = express.Router();

router.post('/create', verifyToken, createTestName)

router.route("/:id")
    .patch(verifyToken, updateTestName)
    .delete(verifyToken, deleteTestName);

    
module.exports = router;