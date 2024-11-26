const express = require('express');
const router = express.Router();
const ocrController = require('../ocr/ocrController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Define the OCR route with file upload
router.post(
  '/ocr',
  uploadMiddleware,
  ocrController.extractTextFromImage
);

module.exports = router;
