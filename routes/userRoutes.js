const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/username/:username", userController.getUserByUsername);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Verify
router.post("/verify", userController.verifyUser);

module.exports = router;
