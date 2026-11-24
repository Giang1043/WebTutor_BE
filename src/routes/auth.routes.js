const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  resendOtpSchema,
  forgotPasswordSchema,
  verifyForgotPasswordOtpSchema,
  resetPasswordSchema,
} = require("../validations/auth.validation");
const authMiddleware = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { loginRateLimiter, otpRateLimiter } = require("../middlewares/rateLimit.middleware");

// Đăng ký
router.post("/register", validate(registerSchema), authController.register);
router.post("/verify-otp", otpRateLimiter, validate(verifyOtpSchema), authController.verifyOtp);
router.post("/resend-otp", otpRateLimiter, validate(resendOtpSchema), authController.resendOtp);

// Đăng nhập / Đăng xuất
router.post("/google", authController.googleLogin);
router.post("/login", loginRateLimiter, validate(loginSchema), authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.post("/refresh-token", authController.refreshToken);

// Quên mật khẩu
router.post("/forgot-password", otpRateLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/verify-forgot-password-otp", otpRateLimiter, validate(verifyForgotPasswordOtpSchema), authController.verifyForgotPasswordOtp);
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);

module.exports = router;
