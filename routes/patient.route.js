const express = require("express");
const patientController = require("../controllers/patient.controller");
const paginate = require("../middlewares/paginate");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/add-new-patient", verifyToken, patientController.addNewPatient);

router.get("/all-patient", verifyToken, paginate, patientController.getAllPatients)

router.get("/:patientId", verifyToken, patientController.getPatientById)

module.exports = router;