const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller.js');
const { pdfUploader } = require('../middlewares/uploader');
const verifyToken = require('../middlewares/verifyToken.js');

router.post("/upload/:testId", verifyToken, pdfUploader.single('pdf'), testController.uploadTestFile);

module.exports = router;