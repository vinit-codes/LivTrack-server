// const Tesseract = require("tesseract.js");
// const { extractHealthParameters } = require("../utils/textParser"); // Import the helper function

// // Function to handle OCR processing and health parameter extraction
// const extractTextAndParameters = async (req, res) => {
//   try {
//     // Check if file exists
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Process the image with Tesseract.js
//     const result = await Tesseract.recognize(
//       req.file.buffer, // Image buffer from multer
//       "eng", // Language for OCR
//       {
//         logger: (m) => console.log(m), // Logs OCR progress
//       }
//     );

//     // Extract text from OCR result
//     const ocrText = result.data.text;
//     // console.log("Extracted Text for Parameters:", ocrText);

//     // Extract health parameters from the OCR text
//     const healthParameters = extractHealthParameters(ocrText);
//     // console.log("Extracted Health Parameters:", healthParameters);

//     // Return the extracted text and health parameters
//     res.status(200).json({ text: ocrText, healthParameters });
//   } catch (error) {
//     console.error("OCR Error:", error);
//     res.status(500).json({ error: "Failed to extract text and parameters" });
//   }
// };

// module.exports = {
//   extractTextAndParameters,
// };
/////////////////

const vision = require("@google-cloud/vision");
const { extractHealthParameters } = require("../utils/textParser"); // Helper function to parse health data

// Instantiates a client for Google Vision API
const client = new vision.ImageAnnotatorClient();

const extractTextAndParameters = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert image buffer to Base64
    const base64Image = req.file.buffer.toString("base64");
    const image = {
      content: base64Image,
    };

    // Perform text detection using Google Vision API
    const [result] = await client.textDetection({ image });
    const ocrText = result.fullTextAnnotation
      ? result.fullTextAnnotation.text
      : "";

    // Log the extracted text
    console.log("Extracted Text:", ocrText);

    // Extract health parameters from OCR text
    const healthParameters = extractHealthParameters(ocrText);

    // Return extracted text and health parameters
    res.status(200).json({ text: ocrText, healthParameters });
  } catch (error) {
    console.error("Google Vision API Error:", error);
    res.status(500).json({ error: "Failed to extract text and parameters" });
  }
};

module.exports = {
  extractTextAndParameters,
};
