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

//////////////

// const mongoose = require('mongoose');

// const eyeHealthSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     eyeTestResults: {
//         type: [String], // Results could be an array (e.g., vision score, pressure readings)
//         default: [],
//     },
//     visualAcuity: {
//         leftEye: {
//             type: String, // e.g., "20/20" or "20/40"
//             default: '',
//         },
//         rightEye: {
//             type: String,
//             default: '',
//         },
//     },
//     eyePressure: {
//         type: Number, // In mmHg, for glaucoma test
//         min: [0, 'Pressure cannot be less than 0'],
//         default: null,
//     },
//     units: {
//         eyePressure: String,
//     },
//     referenceRanges: {
//         eyePressure: String,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
//     source: String,
// });

// const EyeHealthMetric = mongoose.model('EyeHealthMetric', eyeHealthSchema);

// module.exports = EyeHealthMetric;
