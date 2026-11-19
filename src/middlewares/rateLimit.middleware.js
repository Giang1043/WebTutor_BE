const rateLimit = require("express-rate-limit");
const { errorResponse } = require("../utils/response");
const HTTP_STATUS = require("../constants/status");
const MESSAGE = require("../constants/message");

// Giới hạn số lần đăng nhập thất bại theo IP (chống brute-force)
const loginRateLimiter = rateLimit({
  windowMs: Number(process.env.LOGIN_RATE_WINDOW_MS) || 15 * 60 * 1000, // 15 phút
  max: Number(process.env.LOGIN_RATE_MAX) || 10, // tối đa 10 lần sai / 15 phút / IP rồi khoá
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // đăng nhập thành công không tính vào giới hạn
  handler: (req, res) =>
    errorResponse(res, {
      statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
      message: MESSAGE.LOGIN_RATE_LIMITED,
    }),
});

// Giới hạn thao tác OTP theo IP (chống email-bombing và brute-force OTP)
const otpRateLimiter = rateLimit({
  windowMs: Number(process.env.OTP_RATE_WINDOW_MS) || 15 * 60 * 1000, // 15 phút
  max: Number(process.env.OTP_RATE_MAX) || 30, // tối đa 30 thao tác OTP / 15 phút / IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    errorResponse(res, {
      statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
      message: MESSAGE.OTP_RATE_LIMITED,
    }),
});

module.exports = { loginRateLimiter, otpRateLimiter };
