const mongoose = require("mongoose");

// EYE MODEL
const eyeMetricSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sph: {
    type: Number, // Spherical value for glasses or lenses
    required: true,
  },
  cyl: {
    type: Number, // Cylindrical value for astigmatism
    required: true,
  },
  axis: {
    type: Number, // Axis value in degrees (0–180)
    required: true,
    min: [0, "Axis cannot be less than 0 degrees"],
    max: [180, "Axis cannot be more than 180 degrees"],
  },
  date: {
    type: Date, // Date when the measurement was taken
    default: Date.now,
  },
});

const EyeMetric = mongoose.model("EyeMetric", eyeMetricSchema);

module.exports = EyeMetric;
