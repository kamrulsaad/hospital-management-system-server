const express = require("express");
const userController = require("../controllers/user.controller");
const paginate = require("../middlewares/paginate");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/login", userController.login);

router.post("/signup", verifyAdmin, userController.staffSignUp);

router.get("/user-info", verifyToken, userController.getMe);

router.get("/all-doctors", verifyToken, paginate, userController.getAllDoctors)

router.get("/all-user", verifyAdmin, paginate, userController.getAllUsers);

router.get("/:userId", verifyAdmin, userController.getUserById);

module.exports = router;