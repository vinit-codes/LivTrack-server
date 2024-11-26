const Tesseract = require("tesseract.js");

// Function to handle OCR processing
const extractTextAndParameters = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Process the image with Tesseract.js
    const result = await Tesseract.recognize(
      req.file.buffer, // Image buffer from multer
      "eng", // Language for OCR
      {
        logger: (m) => console.log(m), // Logs OCR progress
      }
    );

    // Return the extracted text
    res.status(200).json({ text: result.data.text });
  } catch (error) {
    console.error("OCR Error:", error);
    res.status(500).json({ error: "Failed to extract text" });
  }
};

module.exports = {
  extractTextAndParameters,
};

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
//     // console.log("OCR Result:", result.data.text);

//     const ocrText = result.data.text;
//     console.log("Extracted Text for Parameters:", ocrText);
//     // Extract health parameters from the OCR text
//     const healthParameters = extractHealthParameters(ocrText);
//     console.error("Error Details:", error.stack);

//     console.log("Extracted Health Parameters:", healthParameters);
//     // Return the extracted text and health parameters
//     res.status(200).json({ text: ocrText, healthParameters });
//   } catch (error) {
//     console.error("OCR Error:", error);
//     res.status(500).json({ error: "Failed to extract text and parameters" });
//   }

//   console.log("Extracted Health Parameters:", healthParameters);
// };

// module.exports = {
//   extractTextAndParameters,
// };
