const extractHealthParameters = (ocrText) => {
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
      AnyMetric: /\b([A-Za-z0-9\s]+)\s*[:=]?\s*(\d+\.\d+|\d+)\s*\[(.*?)\]/i,
    };
  
    const extractedParams = {};
  
    // Extract health parameters
    for (const [key, pattern] of Object.entries(healthPatterns)) {
      const match = ocrText.match(pattern);
      if (match) {
        extractedParams[key] = match[1]; // Extract the numerical value
      }
    }
  
    // Extract eye parameters
    for (const [key, pattern] of Object.entries(eyePatterns)) {
      const match = ocrText.match(pattern);
      if (match) {
        extractedParams[key] = match[1];
      }
    }
  
    // Extract generic parameters (fallback)
    const genericMatches = ocrText.matchAll(genericPatterns.AnyMetric);
    for (const match of genericMatches) {
      const [_, name, value, unit] = match;
      extractedParams[name.trim()] = { value: parseFloat(value), unit };
    }
  
    return extractedParams;
  };
  
  module.exports = { extractHealthParameters };
  