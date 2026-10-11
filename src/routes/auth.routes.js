const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { authValidation } = require("../validations");
const {
  registerSchema,
  verifyOtpSchema,
  resendOtpSchema,
  validate,
} = authValidation;
const { otpRateLimiter } = require("../middlewares/rateLimit.middleware");

router.post("/register", validate(registerSchema), authController.register);
router.post("/verify-otp", otpRateLimiter, validate(verifyOtpSchema), authController.verifyOtp);
router.post("/resend-otp", otpRateLimiter, validate(resendOtpSchema), authController.resendOtp);

module.exports = router;
