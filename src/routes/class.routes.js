const express = require("express");
const classController = require("../controllers/class.controller");
const {
  quoteClassSchema,
  createClassSchema,
  listClassQuerySchema,
} = require("../validations/class.validation");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateBody, validateQuery } = require("../middlewares/validate.middleware");
const { validateObjectIdParams } = require("../validations/common.validation");

const router = express.Router();

router.post("/quote", authMiddleware, validateBody(quoteClassSchema), classController.quoteClass);
router.post("/", authMiddleware, validateBody(createClassSchema), classController.createClass);
router.get("/subjects", classController.getSubjects);
router.get("/", validateQuery(listClassQuerySchema), classController.getClasses);
router.get("/:id", validateObjectIdParams("id"), classController.getClassDetail);

module.exports = router;
