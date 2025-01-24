// const cleanText = (ocrText) => {
//   // Replace unwanted characters or symbols
//   let cleanedText = ocrText.replace(/[^\w\s.:,\-()\[\]\/%]/g, ""); // Remove non-alphanumeric characters
//   cleanedText = cleanedText.replace(/\s+/g, " "); // Replace multiple spaces with a single space
//   cleanedText = cleanedText.replace(/\n+/g, " "); // Replace newlines with a space

//   // Normalize text to lowercase and remove extra spaces
//   cleanedText = cleanedText
//     .trim()
//     .replace(/\s{2,}/g, " ")
//     .toLowerCase();

//   return cleanedText;
// };

// const extractHealthParameters = (ocrText) => {
 

//   const healthPatterns = {
//     WBC: /\bWBC\s*(\d+\.\d+|\d+)\s*\[10\^3\/uL\]/i,
//     RBC: /\bRBC\s*(\d+\.\d+|\d+)\s*\[10\^6\/uL\]/i,
//     Hemoglobin: /\b(?:HGB|Hemoglobin)\s*(\d+\.\d+|\d+)\s*\[g\/dL\]/i,
//     Hematocrit: /\b(?:HCT|Hematocrit)\s*(\d+\.\d+|\d+)\s*[%]/i,
//     Platelets: /\b(?:PLT|Platelets)\s*(\d+\.\d+|\d+)\s*\[10\^3\/uL\]/i,
//     LDL: /\bLDL\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     HDL: /\bHDL\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Cholesterol:
//       /\b(?:Total Cholesterol|Cholesterol)\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Triglycerides: /\b(?:TG|Triglycerides)\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Glucose: /\b(?:Glucose|Blood Glucose)\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     VitaminD: /\b(?:Vitamin\s*D|Vit\s*D)\s*(\d+\.\d+|\d+)\s*\[ng\/mL\]/i,
//     Calcium: /\bCalcium\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Creatinine: /\bCreatinine\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Urea: /\bUrea\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     SGPT: /\b(?:SGPT|ALT)\s*(\d+\.\d+|\d+)\s*\[U\/L\]/i,
//     SGOT: /\b(?:SGOT|AST)\s*(\d+\.\d+|\d+)\s*\[U\/L\]/i,
//   };

//   const eyePatterns = {
//     SPH: /\b(?:SPH|Sphere|Spherical)\s*(\+|-)?\d+\.\d+/i,
//     CYL: /\b(?:CYL|Cylinder|Cylindrical)\s*(\+|-)?\d+\.\d+/i,
//     Axis: /\b(?:Axis)\s*(\d{1,3})/i,
//     Add: /\b(?:ADD|Addition)\s*(\+|-)?\d+\.\d+/i,
//     PD: /\b(?:PD|Pupillary\s*Distance)\s*(\d+\.\d+)/i,
//   };

//   const genericPatterns = {
//     AnyMetric: /\b([A-Za-z0-9\s]+)\s*[:=]?\s*(\d+\.\d+|\d+)\s*\[(.*?)\]/gi, // Added global flag 'g'
//   };

//   const extractedParams = {};

//   // Clean the OCR text before attempting to match
//   const cleanedText = cleanText(ocrText);

//   for (const [key, pattern] of Object.entries(healthPatterns)) {
//     const match = cleanedText.match(pattern);
//     if (match) {
//       extractedParams[key] = match[1]; // Extracted value (number)
//     }
//   }

//   // Extract health parameters
//   for (const [key, pattern] of Object.entries(healthPatterns)) {
//     const match = ocrText.match(pattern);
//     if (match) {
//       extractedParams[key] = parseFloat(match[1].replace(/[^0-9.-]+/g, "")); // Remove any non-numeric characters
//     }
//   }

//   // Extract eye parameters
//   for (const [key, pattern] of Object.entries(eyePatterns)) {
//     const match = ocrText.match(pattern);
//     if (match) {
//       extractedParams[key] = match[1].trim(); // Trim any excess whitespace
//     }
//   }

//   // Extract generic parameters (fallback)
//   const genericMatches = ocrText.matchAll(genericPatterns.AnyMetric);
//   for (const match of genericMatches) {
//     const [_, name, value, unit] = match;
//     extractedParams[name.trim()] = { value: parseFloat(value), unit };
//   }
//   console.log("Original OCR Text:", ocrText);
// console.log("Cleaned Text:", cleanedText);

//   console.log(extractedParams);
//   // Return the parsed health parameters
//   return extractedParams;
// };

// module.exports = { extractHealthParameters };
/////////////////////

// const cleanText = (ocrText) => {
//   // Remove unwanted characters but keep the necessary ones like %, /, : for measurements
//   let cleanedText = ocrText.replace(/[^\w\s.:,\-()\[\]\/%|]/g, "");

//   // Handle common OCR misreads (like | for I and 0 for O)
//   cleanedText = cleanedText.replace(/[|]/g, "I").replace(/[0]/g, "O");

//   // Replace multiple spaces with a single space and newlines with space
//   cleanedText = cleanedText.replace(/\s+/g, " ").replace(/\n+/g, " ").trim();

//   // Normalize the text to lowercase and remove any excessive spaces
//   cleanedText = cleanedText.replace(/\s{2,}/g, " ").toLowerCase();

//   return cleanedText;
// };

// // Mapping units and values
// const unitMapping = {
//   "mg/dL": "mg/dL",
//   "U/L": "U/L",
//   "10^3/uL": "10^3/uL",
//   "ng/mL": "ng/mL",
//   "g/dL": "g/dL",
//   "%": "%",
// };

// // Health parameter regex patterns
// const healthPatterns = {
//   WBC: /\bWBC\s*(\d+[\.,]?\d*)\s*\[10\^3\/uL\]/i,
//   RBC: /\bRBC\s*(\d+[\.,]?\d*)\s*\[10\^6\/uL\]/i,
//   Hemoglobin: /\b(?:HGB|Hemoglobin)\s*(\d+[\.,]?\d*)\s*\[g\/dL\]/i,
//   Hematocrit: /\b(?:HCT|Hematocrit)\s*(\d+[\.,]?\d*)\s*[%]/i,
//   Platelets: /\b(?:PLT|Platelets)\s*(\d+[\.,]?\d*)\s*\[10\^3\/uL\]/i,
//   LDL: /\bLDL\s*(\d+[\.,]?\d*)\s*\[mg\/dL\]/i,
//   HDL: /\bHDL\s*(\d+[\.,]?\d*)\s*\[mg\/dL\]/i,
//   Cholesterol: /\b(?:Total Cholesterol|Cholesterol)\s*(\d+[\.,]?\d*)\s*\[mg\/dL\]/i,
//   Triglycerides: /\b(?:TG|Triglycerides)\s*(\d+[\.,]?\d*)\s*\[mg\/dL\]/i,
//   Glucose: /\b(?:Glucose|Blood Glucose)\s*(\d+[\.,]?\d*)\s*\[mg\/dL\]/i,
//   VitaminD: /\b(?:Vitamin\s*D|Vit\s*D)\s*(\d+[\.,]?\d*)\s*\[ng\/mL\]/i,
//   Calcium: /\bCalcium\s*(\d+[\.,]?\d*)\s*\[mg\/dL\]/i,
//   Creatinine: /\bCreatinine\s*(\d+[\.,]?\d*)\s*\[mg\/dL\]/i,
//   Urea: /\bUrea\s*(\d+[\.,]?\d*)\s*\[mg\/dL\]/i,
//   SGPT: /\b(?:SGPT|ALT)\s*(\d+[\.,]?\d*)\s*\[U\/L\]/i,
//   SGOT: /\b(?:SGOT|AST)\s*(\d+[\.,]?\d*)\s*\[U\/L\]/i,
// };

// // Extract Health Parameters Function
// const extractHealthParameters = (ocrText) => {
//   const extractedParams = {};

//   // Clean the OCR text
//   const cleanedText = cleanText(ocrText);

//   // Extract health parameters using patterns
//   for (const [key, pattern] of Object.entries(healthPatterns)) {
//     const match = cleanedText.match(pattern);
//     if (match) {
//       const value = parseFloat(match[1].replace(/[^0-9.-]+/g, ""));
//       extractedParams[key] = value;
//     }
//   }

//   return extractedParams; // Return the extracted parameters in a structured format
// };

// module.exports = { extractHealthParameters };
///////////////////

// const cleanText = (ocrText) => {
//   console.log("Starting text cleaning...");

//   // Replace unwanted characters or symbols
//   let cleanedText = ocrText.replace(/[^\w\s.:,\-()\[\]\/%]/g, ""); // Remove non-alphanumeric characters
//   cleanedText = cleanedText.replace(/\s+/g, " "); // Replace multiple spaces with a single space
//   cleanedText = cleanedText.replace(/\n+/g, " "); // Replace newlines with a space

//   // Normalize text to lowercase and remove extra spaces
//   cleanedText = cleanedText
//     .trim()
//     .replace(/\s{2,}/g, " ")
//     .toLowerCase();

//   console.log("Cleaned Text:", cleanedText);
//   return cleanedText;
// };

// const extractHealthParameters = (ocrText) => {
//   console.log("Starting parameter extraction...");
  
//   if (!ocrText || typeof ocrText !== "string") {
//     console.error("Invalid OCR text input. Please provide a valid string.");
//     return {};
//   }

//   const healthPatterns = {
//     WBC: /\bWBC\s*(\d+\.\d+|\d+)\s*\[10\^3\/uL\]/i,
//     RBC: /\bRBC\s*(\d+\.\d+|\d+)\s*\[10\^6\/uL\]/i,
//     Hemoglobin: /\b(?:HGB|Hemoglobin)\s*(\d+\.\d+|\d+)\s*\[g\/dL\]/i,
//     Hematocrit: /\b(?:HCT|Hematocrit)\s*(\d+\.\d+|\d+)\s*[%]/i,
//     Platelets: /\b(?:PLT|Platelets)\s*(\d+\.\d+|\d+)\s*\[10\^3\/uL\]/i,
//     LDL: /\bLDL\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     HDL: /\bHDL\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Cholesterol: /\b(?:Total Cholesterol|Cholesterol)\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Triglycerides: /\b(?:TG|Triglycerides)\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Glucose: /\b(?:Glucose|Blood Glucose)\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     VitaminD: /\b(?:Vitamin\s*D|Vit\s*D)\s*(\d+\.\d+|\d+)\s*\[ng\/mL\]/i,
//     Calcium: /\bCalcium\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Creatinine: /\bCreatinine\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     Urea: /\bUrea\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
//     SGPT: /\b(?:SGPT|ALT)\s*(\d+\.\d+|\d+)\s*\[U\/L\]/i,
//     SGOT: /\b(?:SGOT|AST)\s*(\d+\.\d+|\d+)\s*\[U\/L\]/i,
//   };

//   const eyePatterns = {
//     SPH: /\b(?:SPH|Sphere|Spherical)\s*(\+|-)?\d+\.\d+/i,
//     CYL: /\b(?:CYL|Cylinder|Cylindrical)\s*(\+|-)?\d+\.\d+/i,
//     Axis: /\b(?:Axis)\s*(\d{1,3})/i,
//     Add: /\b(?:ADD|Addition)\s*(\+|-)?\d+\.\d+/i,
//     PD: /\b(?:PD|Pupillary\s*Distance)\s*(\d+\.\d+)/i,
//   };

//   const genericPatterns = {
//     AnyMetric: /\b([A-Za-z0-9\s]+)\s*[:=]?\s*(\d+\.\d+|\d+)\s*\[(.*?)\]/gi, // Added global flag 'g'
//   };

//   const extractedParams = {};

//   // Clean the OCR text
//   const cleanedText = cleanText(ocrText);

//   // Extract health parameters
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

//   // Extract eye parameters
//   console.log("Extracting eye parameters...");
//   for (const [key, pattern] of Object.entries(eyePatterns)) {
//     const match = cleanedText.match(pattern);
//     if (match) {
//       extractedParams[key] = match[1].trim();
//       console.log(`Extracted ${key}:`, extractedParams[key]);
//     } else {
//       console.warn(`Pattern for ${key} not matched.`);
//     }
//   }

//   // Extract generic parameters (fallback)
//   console.log("Extracting generic parameters...");
//   const genericMatches = cleanedText.matchAll(genericPatterns.AnyMetric);
//   for (const match of genericMatches) {
//     const [_, name, value, unit] = match;
//     extractedParams[name.trim()] = { value: parseFloat(value), unit };
//     console.log(`Extracted Generic: ${name.trim()} = ${value} ${unit}`);
//   }

//   console.log("Final Extracted Parameters:", extractedParams);
//   return extractedParams;
// };

// module.exports = { extractHealthParameters };



const cleanText = (ocrText) => {
  console.log("Starting text cleaning...");

  // Replace unwanted characters or symbols
  let cleanedText = ocrText.replace(/[^\w\s.:,\-()\[\]\/%]/g, ""); // Remove non-alphanumeric characters
  cleanedText = cleanedText.replace(/\s+/g, " "); // Replace multiple spaces with a single space
  cleanedText = cleanedText.replace(/\n+/g, " "); // Replace newlines with a space

  // Normalize text to lowercase and remove extra spaces
  cleanedText = cleanedText
    .trim()
    .replace(/\s{2,}/g, " ") // Remove extra spaces
    .toLowerCase();

  console.log("Cleaned Text:", cleanedText);
  return cleanedText;
};

const extractHealthParameters = (ocrText) => {
  console.log("Starting parameter extraction...");
  
  // Validate OCR input
  if (!ocrText || typeof ocrText !== "string") {
    console.error("Invalid OCR text input. Please provide a valid string.");
    return {};
  }

  const healthPatterns = {
    WBC: /\bWBC\s*(\d+\.\d+|\d+)\s*\[10\^3\/uL\]/i,
    RBC: /\bRBC\s*(\d+\.\d+|\d+)\s*\[10\^6\/uL\]/i,
    Hemoglobin: /\b(?:HGB|Hemoglobin)\s*(\d+\.\d+|\d+)\s*\[g\/dL\]/i,
    Hematocrit: /\b(?:HCT|Hematocrit)\s*(\d+\.\d+|\d+)\s*[%]/i,
    Platelets: /\b(?:PLT|Platelets)\s*(\d+\.\d+|\d+)\s*\[10\^3\/uL\]/i,
    LDL: /\bLDL\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
    HDL: /\bHDL\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
    Cholesterol: /\b(?:Total Cholesterol|Cholesterol)\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
    Triglycerides: /\b(?:TG|Triglycerides)\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
    Glucose: /\b(?:Glucose|Blood Glucose)\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
    VitaminD: /\b(?:Vitamin\s*D|Vit\s*D)\s*(\d+\.\d+|\d+)\s*\[ng\/mL\]/i,
    Calcium: /\bCalcium\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
    Creatinine: /\bCreatinine\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
    Urea: /\bUrea\s*(\d+\.\d+|\d+)\s*\[mg\/dL\]/i,
    SGPT: /\b(?:SGPT|ALT)\s*(\d+\.\d+|\d+)\s*\[U\/L\]/i,
    SGOT: /\b(?:SGOT|AST)\s*(\d+\.\d+|\d+)\s*\[U\/L\]/i,
  };

  const eyePatterns = {
    SPH: /\b(?:SPH|Sphere|Spherical)\s*(\+|-)?\d+\.\d+/i,
    CYL: /\b(?:CYL|Cylinder|Cylindrical)\s*(\+|-)?\d+\.\d+/i,
    Axis: /\b(?:Axis)\s*(\d{1,3})/i,
    Add: /\b(?:ADD|Addition)\s*(\+|-)?\d+\.\d+/i,
    PD: /\b(?:PD|Pupillary\s*Distance)\s*(\d+\.\d+)/i,
  };

  const genericPatterns = {
    AnyMetric: /\b([A-Za-z0-9\s]+)\s*[:=]?\s*(\d+\.\d+|\d+)\s*\[(.*?)\]/gi, // Added global flag 'g'
  };

  const extractedParams = {};

  // Clean the OCR text
  const cleanedText = cleanText(ocrText);

  // Extract health parameters
  console.log("Extracting health parameters...");
  for (const [key, pattern] of Object.entries(healthPatterns)) {
    const match = cleanedText.match(pattern);
    if (match) {
      extractedParams[key] = parseFloat(match[1]);
      console.log(`Extracted ${key}:`, extractedParams[key]);
    } else {
      console.warn(`Pattern for ${key} not matched.`);
    }
  }

  // Extract eye parameters
  console.log("Extracting eye parameters...");
  for (const [key, pattern] of Object.entries(eyePatterns)) {
    const match = cleanedText.match(pattern);
    if (match) {
      extractedParams[key] = match[1].trim();
      console.log(`Extracted ${key}:`, extractedParams[key]);
    } else {
      console.warn(`Pattern for ${key} not matched.`);
    }
  }

  // Extract generic parameters (fallback)
  console.log("Extracting generic parameters...");
  const genericMatches = cleanedText.matchAll(genericPatterns.AnyMetric);
  for (const match of genericMatches) {
    const [_, name, value, unit] = match;
    extractedParams[name.trim()] = { value: parseFloat(value), unit };
    console.log(`Extracted Generic: ${name.trim()} = ${value} ${unit}`);
  }

  console.log("Final Extracted Parameters:", extractedParams);
  return extractedParams;
};

module.exports = { extractHealthParameters };
