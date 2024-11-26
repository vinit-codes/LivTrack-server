const mongoose = require('mongoose');

const bloodTestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rbc: {
        type: Number, // Red Blood Cell count (in million/μL)
        min: [0, 'RBC cannot be less than 0'],
    },
    wbc: {
        type: Number, // White Blood Cell count (in cells/μL)
        min: [0, 'WBC cannot be less than 0'],
    },
    hemoglobin: {
        type: Number, // Hemoglobin level (in g/dL)
        min: [0, 'Hemoglobin cannot be less than 0'],
    },
    date: {
        type: Date, // Date of the blood test
        default: Date.now,
    },
});

const BloodTestMetric = mongoose.model('BloodTestMetric', bloodTestSchema);

module.exports = BloodTestMetric;
