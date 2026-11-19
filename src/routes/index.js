const express = require("express");
const router = express.Router();

const sanitizeMongo = require("../middlewares/sanitizeMongo.middleware");
const paginationGuard = require("../middlewares/paginationGuard.middleware");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const tutorRoutes = require("./tutor.routes");
const locationRoutes = require("./location.routes");
const notificationRoutes = require("./notification.routes");
const classRoutes = require("./class.routes");

// Làm sạch input (xoá key toán tử Mongo "$"/".") cho mọi route /api -> chống NoSQL injection
router.use(sanitizeMongo);
// Ép trần/sàn cho page & limit -> chặn client nạp cả collection qua ?limit khổng lồ
router.use(paginationGuard);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tutors", tutorRoutes);
router.use("/locations", locationRoutes);
router.use("/notifications", notificationRoutes);
router.use("/classes", classRoutes);

module.exports = router;
