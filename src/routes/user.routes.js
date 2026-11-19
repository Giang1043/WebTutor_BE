const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { updateProfileSchema } = require("../validations/user.validation");
const authMiddleware = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { uploadAvatarMiddleware } = require("../utils/upload");

router.get("/user-info", authMiddleware, userController.getUserInfo);
router.post("/upload-avatar", authMiddleware, uploadAvatarMiddleware, userController.uploadAvatar);
router.patch("/update-profile", authMiddleware, validate(updateProfileSchema), userController.updateProfile);

module.exports = router;
