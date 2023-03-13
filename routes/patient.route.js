const express = require("express");
const patientController = require("../controllers/patient.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/add-new-patient", verifyToken, patientController.addNewPatient);

router.get("/all-patient", verifyToken, patientController.getAllPatients)

router.get("/:patientId", verifyToken, patientController.getPatientById)

module.exports = router;