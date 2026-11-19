const express = require("express");
const router = express.Router();

const tutorController = require("../controllers/tutor.controller");
const { registerTutorSchema, rejectTutorSchema } = require("../validations/tutor.validation");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { validateObjectIdParams } = require("../validations/common.validation");

router.post("/register", authMiddleware, validate(registerTutorSchema), tutorController.registerTutor);
router.get("/profile", authMiddleware, tutorController.getTutorProfile);

// Admin routes
router.get("/admin/stats", authMiddleware, roleMiddleware("admin"), tutorController.getDashboardStats);
router.get("/admin/pending", authMiddleware, roleMiddleware("admin"), tutorController.getPendingTutors);
router.patch("/admin/:id/approve", authMiddleware, roleMiddleware("admin"), validateObjectIdParams("id"), tutorController.approveTutor);
router.patch("/admin/:id/reject", authMiddleware, roleMiddleware("admin"), validateObjectIdParams("id"), validate(rejectTutorSchema), tutorController.rejectTutor);

module.exports = router;
