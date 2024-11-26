
const express = require("express");
const router = express.Router();
const ocrController = require("../healthControllers/ocrController");
const upload = require("../middleware/uploadMiddleware");

// POST route to upload a test report
router.post(
  "/upload-report",
  upload.single("reportFile"), // Ensure 'reportFile' matches the form field name in Postman
  ocrController.extractTextAndParameters// Ensure this matches the controller function name
);

module.exports = router;
