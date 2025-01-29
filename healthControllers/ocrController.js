// const vision = require("@google-cloud/vision");
// const fetch = require("node-fetch"); // For making HTTP requests to Hugging Face API

// // Instantiates a client for Google Vision API
// const client = new vision.ImageAnnotatorClient();

// // Hugging Face API URL for Text Generation
// const HUGGING_FACE_URL = "https://api-inference.huggingface.co/models/gpt2"; // Change to the appropriate Hugging Face model URL

// const HUGGING_FACE_API_KEY = "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"; // Replace with your actual Hugging Face API key

// const extractTextAndParameters = async (req, res) => {
//   try {
//     // Check if file exists
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Convert image buffer to Base64
//     const base64Image = req.file.buffer.toString("base64");
//     const image = {
//       content: base64Image,
//     };

//     // Perform text detection using Google Vision API
//     const [result] = await client.textDetection({ image });
//     const ocrText = result.fullTextAnnotation
//       ? result.fullTextAnnotation.text
//       : "";

//     // Log the extracted text
//     console.log("Extracted Text:", ocrText);

//     // Send the extracted text to Hugging Face for further processing
//     const response = await fetch(HUGGING_FACE_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${HUGGING_FACE_API_KEY}`, // Using the hardcoded Hugging Face API key
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         inputs: ocrText,
//       }),
//     });

//     // Check if the response is successful
//     if (!response.ok) {
//       return res.status(500).json({ error: "Hugging Face API error" });
//     }

//     const data = await response.json();
//     console.log("Hugging Face Response:", data);

//     // Return the extracted text and insights from Hugging Face
//     res.status(200).json({
//       text: ocrText,
//       hugggingFaceResponse: data,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Failed to extract text and parameters" });
//   }
// };

// module.exports = {
//   extractTextAndParameters,
// };

//////////////

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
