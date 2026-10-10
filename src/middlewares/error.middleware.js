const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error.isOperational) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error(`[SYSTEM ERROR] ${req.method} ${req.originalUrl}`, error);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = errorMiddleware;
