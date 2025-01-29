const mongoose = require("mongoose");

const bloodTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rbc: {
    type: [Number], // RBC values could be an array to accommodate multiple readings
    min: [0, "RBC cannot be less than 0"],
    default: [],
  },
  wbc: {
    type: [Number], // WBC values could also be an array
    min: [0, "WBC cannot be less than 0"],
    default: [],
  },
  hemoglobin: {
    type: [Number],
    min: [0, "Hemoglobin cannot be less than 0"],
    default: [],
  },
  packedCellVolume: {
    type: [Number],
    default: [],
  },
  mcv: {
    type: [Number],
    default: [],
  },
  mch: {
    type: [Number],
    default: [],
  },
  mchc: {
    type: [Number],
    default: [],
  },
  rdw: {
    type: [Number],
    default: [],
  },
  wbcDifferential: {
    neutrophils: { type: [Number], default: [] },
    lymphocytes: { type: [Number], default: [] },
    eosinophils: { type: [Number], default: [] },
    monocytes: { type: [Number], default: [] },
    basophils: { type: [Number], default: [] },
  },
  plateletCount: {
    type: [Number],
    min: [0, "Platelet count cannot be less than 0"],
    default: [],
  },
  units: {
    hemoglobin: String,
    rbc: String,
    wbc: String,
    plateletCount: String,
  },
  referenceRanges: {
    hemoglobin: String,
    rbc: String,
    wbc: String,
    plateletCount: String,
  },
  date: {
    type: Date, // Date of the test or report
    default: Date.now,
  },
  source: String, // E.g., the lab name or source of the report
});

const BloodTestMetric = mongoose.model("BloodTestMetric", bloodTestSchema);

module.exports = BloodTestMetric;
