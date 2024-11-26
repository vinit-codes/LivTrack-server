const mongoose = require('mongoose');

const cholesterolMetricSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ldl: {
        type: Number, // Low-density lipoprotein ("bad" cholesterol)
        required: true,
        min: [0, 'LDL cannot be less than 0'],
    },
    hdl: {
        type: Number, // High-density lipoprotein ("good" cholesterol)
        required: true,
        min: [0, 'HDL cannot be less than 0'],
    },
    triglycerides: {
        type: Number, // Triglycerides (another type of fat in the blood)
        required: true,
        min: [0, 'Triglycerides cannot be less than 0'],
    },
    date: {
        type: Date, // Date of the test result
        default: Date.now,
    },
});

const CholesterolMetric = mongoose.model('CholesterolMetric', cholesterolMetricSchema);

module.exports = CholesterolMetric;