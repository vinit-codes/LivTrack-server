// const cleanText = (ocrText) => {
//   console.log("Starting text cleaning...");

//   // Replace unwanted characters or symbols
//   let cleanedText = ocrText.replace(/[^\w\s.:,\-()%\/]/g, ""); // Remove non-alphanumeric characters
//   cleanedText = cleanedText.replace(/\s+/g, " "); // Replace multiple spaces with a single space
//   cleanedText = cleanedText.replace(/\n+/g, " "); // Replace newlines with a space

//   // Normalize text to lowercase and remove extra spaces
//   cleanedText = cleanedText.trim().replace(/\s{2,}/g, " "); // Remove extra spaces

//   console.log("Cleaned Text:", cleanedText);
//   return cleanedText.toLowerCase(); // Lowercase for case-insensitive matching
// };

// const extractHealthParameters = (ocrText) => {
//   console.log("Starting parameter extraction...");

//   // Validate OCR input
//   if (!ocrText || typeof ocrText !== "string") {
//     console.error("Invalid OCR text input. Please provide a valid string.");
//     return {};
//   }

//   // Define patterns for extraction
//   const healthPatterns = {
//     Hemoglobin: /\b(?:Hemoglobin|Hb)\s*(\d+\.\d+|\d+)/,
//     WBC: /\b(?:WBC Count|Total WBC)\s*(\d+)/i,
//     RBC: /\b(?:RBC Count|Total RBC count)\s*(\d+\.\d+)/i,
//     Platelets: /\b(?:Platelet Count|PLT)\s*(\d+)/i,
//     Neutrophils: /\b(?:Neutrophils|Absolute Neutrophils)\s*(\d+)/i,
//     Lymphocytes: /\b(?:Lymphocytes|Absolute Lymphocytes)\s*(\d+)/i,
//     Eosinophils: /\b(?:Eosinophils|Absolute Eosinophils)\s*(\d+)/i,
//     Monocytes: /\b(?:Monocytes|Absolute Monocytes)\s*(\d+)/i,
//     Basophils: /\b(?:Basophils|Absolute Basophils)\s*(\d+)/i,
//     PackedCellVolume: /\b(?:PCV|Packed Cell Volume)\s*(\d+\.\d+|\d+)/i,
//     MCV: /\b(?:MCV|Mean Corpuscular Volume)\s*(\d+\.\d+|\d+)/i,
//     MCH: /\b(?:MCH|Mean Corpuscular Hemoglobin)\s*(\d+\.\d+|\d+)/i,
//     MCHC: /\b(?:MCHC|Mean Corpuscular Hemoglobin Concentration)\s*(\d+\.\d+|\d+)/i,
//     RDW: /\b(?:RDW|Red Cell Distribution Width)\s*(\d+\.\d+|\d+)/i,
//   };

//   const extractedParams = {};

//   // Clean the OCR text
//   const cleanedText = cleanText(ocrText);

//   // Extract parameters
//   console.log("Extracting health parameters...");
//   for (const [key, pattern] of Object.entries(healthPatterns)) {
//     const match = cleanedText.match(pattern);
//     if (match) {
//       extractedParams[key] = parseFloat(match[1]);
//       console.log(`Extracted ${key}:`, extractedParams[key]);
//     } else {
//       console.warn(`Pattern for ${key} not matched.`);
//     }
//   }

//   // Organize the extracted parameters
//   console.log("Organizing extracted parameters...");
//   const healthParameters = {
//     blood: {},
//     cholesterol: {},
//     glucose: {},
//     vitamin: {},
//     eye: {},
//     misc: {},
//   };

//   for (const [key, value] of Object.entries(extractedParams)) {
//     if (
//       [
//         "Hemoglobin",
//         "WBC",
//         "RBC",
//         "Platelets",
//         "Neutrophils",
//         "Lymphocytes",
//         "Eosinophils",
//         "Monocytes",
//         "Basophils",
//         "PackedCellVolume",
//         "MCV",
//         "MCH",
//         "MCHC",
//         "RDW",
//       ].includes(key)
//     ) {
//       healthParameters.blood[key] = value;
//     } else {
//       healthParameters.misc[key] = value;
//     }
//   }

//   console.log("Final Organized Parameters:", healthParameters);
//   return healthParameters;
// };

// module.exports = { extractHealthParameters };


// ////////


const cleanText = (ocrText) => {
  const debug = false; // Toggle for debugging logs
  if (debug) console.log("Starting text cleaning...");

  // Replace unwanted characters or symbols
  let cleanedText = ocrText.replace(/[^\w\s.:,\-()%\/]/g, ""); // Remove non-alphanumeric characters
  cleanedText = cleanedText.replace(/\s+/g, " "); // Replace multiple spaces with a single space 
  cleanedText = cleanedText.replace(/\n+/g, " "); // Replace newlines with a space

  // Normalize text to lowercase and remove extra spaces
  cleanedText = cleanedText.trim().replace(/\s{2,}/g, " "); // Remove extra spaces

  if (debug) console.log("Cleaned Text:", cleanedText);
  return cleanedText.toLowerCase(); // Lowercase for case-insensitive matching
};

const extractHealthParameters = (ocrText) => {
  const debug = false; // Toggle for debugging logs
  if (debug) console.log("Starting parameter extraction...");

  // Validate OCR input
  if (!ocrText || typeof ocrText !== "string") {
    console.error("Invalid OCR text input. Please provide a valid string.");
    return {};
  }

  // Define patterns for extraction
  const healthPatterns = {
    Hemoglobin: /\b(?:Hemoglobin|Hb)\s*(\d+\.\d+|\d+)/,
    WBC: /\b(?:WBC Count|Total WBC)\s*(\d+)/i,
    RBC: /\b(?:RBC Count|Total RBC count)\s*(\d+\.\d+)/i,
    Platelets: /\b(?:Platelet Count|PLT)\s*(\d+)/i,
    Neutrophils: /\b(?:Neutrophils|Absolute Neutrophils)\s*(\d+)/i,
    Lymphocytes: /\b(?:Lymphocytes|Absolute Lymphocytes)\s*(\d+)/i,
    Eosinophils: /\b(?:Eosinophils|Absolute Eosinophils)\s*(\d+)/i,
    Monocytes: /\b(?:Monocytes|Absolute Monocytes)\s*(\d+)/i,
    Basophils: /\b(?:Basophils|Absolute Basophils)\s*(\d+)/i,
    PackedCellVolume: /\b(?:PCV|Packed Cell Volume)\s*(\d+\.\d+|\d+)/i,
    MCV: /\b(?:MCV|Mean Corpuscular Volume)\s*(\d+\.\d+|\d+)/i,
    MCH: /\b(?:MCH|Mean Corpuscular Hemoglobin)\s*(\d+\.\d+|\d+)/i,
    MCHC: /\b(?:MCHC|Mean Corpuscular Hemoglobin Concentration)\s*(\d+\.\d+|\d+)/i,
    RDW: /\b(?:RDW|Red Cell Distribution Width)\s*(\d+\.\d+|\d+)/i,
    LDL: /\b(?:LDL|Low-Density Lipoprotein)\s*(\d+\.\d+)/i,
    HDL: /\b(?:HDL|High-Density Lipoprotein)\s*(\d+\.\d+)/i,
    Triglycerides: /\b(?:Triglycerides|TG)\s*(\d+\.\d+)/i,
    SPH: /\b(?:SPH|Sphere)\s*(-?\d+\.\d+)/i,
    CYL: /\b(?:CYL|Cylinder)\s*(-?\d+\.\d+)/i,
    Axis: /\b(?:Axis)\s*(\d+)/i,
  };

  const extractedParams = {};

  // Clean the OCR text
  const cleanedText = cleanText(ocrText);

  // Extract parameters
  if (debug) console.log("Extracting health parameters...");
  for (const [key, pattern] of Object.entries(healthPatterns)) {
    const match = cleanedText.match(pattern);
    if (match) {
      extractedParams[key] = parseFloat(match[1]);
      if (debug) console.log(`Extracted ${key}:`, extractedParams[key]);
    } else if (debug) {
      console.warn(`Pattern for ${key} not matched.`);
    }
  }

  // Organize the extracted parameters
  const categoryMapping = {
    blood: [
      "Hemoglobin",
      "WBC",
      "RBC",
      "Platelets",
      "Neutrophils",
      "Lymphocytes",
      "Eosinophils",
      "Monocytes",
      "Basophils",
      "PackedCellVolume",
      "MCV",
      "MCH",
      "MCHC",
      "RDW",
    ],
    cholesterol: ["LDL", "HDL", "Triglycerides"],
    glucose: ["FastingGlucose", "PostprandialGlucose"],
    vitamin: ["VitaminD", "VitaminB12"],
    eye: ["SPH", "CYL", "Axis"],
  };

  const healthParameters = Object.keys(categoryMapping).reduce(
    (acc, category) => {
      acc[category] = {};
      return acc;
    },
    {}
  );

  for (const [key, value] of Object.entries(extractedParams)) {
    let foundCategory = false;
    for (const [category, keys] of Object.entries(categoryMapping)) {
      if (keys.includes(key)) {
        healthParameters[category][key] = value;
        foundCategory = true;
        break;
      }
    }

    if (!foundCategory) {
      healthParameters.misc[key] = value;
    }
  }

  if (debug) console.log("Final Organized Parameters:", healthParameters);
  return healthParameters;
};

module.exports = { extractHealthParameters }; // Exporting the function for use in other files
