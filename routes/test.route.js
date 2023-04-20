const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller.js');
const { pdfUploader } = require('../middlewares/uploader');
const verifyToken = require('../middlewares/verifyToken.js');
const paginate = require('../middlewares/paginate.js');

router.post("/upload/:testId", verifyToken, pdfUploader.single('pdf'), testController.uploadTestFile);

router.get("/all", verifyToken, paginate, testController.allTests);

router.route("/:testId")
.get(testController.getTest);

module.exports = router;