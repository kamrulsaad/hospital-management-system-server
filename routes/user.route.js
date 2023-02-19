const express = require("express");
const userController = require("../controllers/user.controller");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();


router.post("/signup", userController.signup);

// router.get("/signup/confirmation/:token", userController.confirmEmail);

router.post("/login", userController.login);

router.post("/signup/staff", verifyAdmin, userController.staffSignUp);

router.get("/user-info", verifyToken, userController.getMe);


module.exports = router;