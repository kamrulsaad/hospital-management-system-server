const express = require('express');
const router = express.Router();
const pcController = require('../controllers/pc.controller');
const verifyToken = require('../middlewares/verifyToken');
const paginate = require('../middlewares/paginate');

router.post('/register', verifyToken, pcController.register)

router.get('/all', paginate, verifyToken, pcController.getAll)

module.exports = router;