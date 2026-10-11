const express = require("express");
const router = express.Router();

const sanitizeMongo = require("../middlewares/sanitizeMongo.middleware");
const authRoutes = require("./auth.routes");

// Apply the shared input guard before the register and OTP endpoints.
router.use(sanitizeMongo);
router.use("/auth", authRoutes);

module.exports = router;
