const express = require("express");
const router = express.Router();
const {
  cholesterolExtractTextAndSaveToDB,
} = require("../healthControllers/ocrController");
const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

// POST route to upload a test report
router.post(
  "/upload-report",
  upload.single("reportFile"),
  authMiddleware.protect,
  cholesterolExtractTextAndSaveToDB
);

module.exports = router;
