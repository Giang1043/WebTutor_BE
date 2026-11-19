const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const notificationController = require("../controllers/notification.controller");
const { validateObjectIdParams } = require("../validations/common.validation");

router.use(authMiddleware);

router.get("/", notificationController.getNotifications);
router.patch("/:id/read", validateObjectIdParams("id"), notificationController.markAsRead);
router.patch("/read-all", notificationController.markAllAsRead);

module.exports = router;
