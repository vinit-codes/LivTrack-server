const mongoose = require("mongoose");

const cholesterolTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cholesterolLevels: {
    totalCholesterol: {
      type: [Number], // Multiple readings can be stored
      default: [],
    },
    ldl: {
      type: [Number],
      default: [],
    },
    hdl: {
      type: [Number],
      default: [],
    },
    triglycerides: {
      type: [Number],
      default: [],
    },
  },
  units: {
    totalCholesterol: String,
    ldl: String,
    hdl: String,
    triglycerides: String,
  },
  referenceRanges: {
    totalCholesterol: String,
    ldl: String,
    hdl: String,
    triglycerides: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  source: String,
});

const CholesterolTestMetric = mongoose.model(
  "CholesterolTestMetric",
  cholesterolTestSchema
);

module.exports = CholesterolTestMetric;
