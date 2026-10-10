const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./src/middlewares/error.middleware");
const { successResponse } = require("./src/utils/response");
const AppError = require("./src/utils/AppError");

const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:4000" }));
app.use(express.json());

app.get("/health", (req, res) =>
  successResponse(res, {
    message: "WebTutor_BE is running",
    data: { service: "backend", environment: process.env.NODE_ENV || "development" },
  }),
);

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
});

app.use(errorMiddleware);

module.exports = app;
