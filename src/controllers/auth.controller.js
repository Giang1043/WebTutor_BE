const authService = require("../services/auth.service");
const { successResponse } = require("../utils/response");
const { sendRefreshToken } = require("../utils/token");
const MESSAGE = require("../constants/message");
const HTTP_STATUS = require("../constants/status");

const register = async (req, res, next) => {
  try {
    const { email } = await authService.register(req.body);
    return successResponse(res, {
      statusCode: HTTP_STATUS.CREATED,
      message: MESSAGE.OTP_SENT,
      data: { email },
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await authService.verifyOtp(
      req.body,
      {},
    );
    return successResponse(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGE.OTP_VERIFY_SUCCESS,
      data: { accessToken, user, ...sendRefreshToken(req, res, refreshToken) },
    });
  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = await authService.resendOtp(req.body);
    return successResponse(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGE.OTP_RESENT,
      data: { email },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, verifyOtp, resendOtp };
