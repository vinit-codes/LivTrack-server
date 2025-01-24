// const mongoose = require('mongoose');

// const cholesterolMetricSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     ldl: {
//         type: Number, // Low-density lipoprotein ("bad" cholesterol)
//         required: true,
//         min: [0, 'LDL cannot be less than 0'],
//     },
//     hdl: {
//         type: Number, // High-density lipoprotein ("good" cholesterol)
//         required: true,
//         min: [0, 'HDL cannot be less than 0'],
//     },
//     triglycerides: {
//         type: Number, // Triglycerides (another type of fat in the blood)
//         required: true,
//         min: [0, 'Triglycerides cannot be less than 0'],
//     },
//     date: {
//         type: Date, // Date of the test result
//         default: Date.now,
//     },
// });

// const CholesterolMetric = mongoose.model('CholesterolMetric', cholesterolMetricSchema);

// module.exports = CholesterolMetric;

//////////

const mongoose = require('mongoose');

const cholesterolTestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

const CholesterolTestMetric = mongoose.model('CholesterolTestMetric', cholesterolTestSchema);

module.exports = CholesterolTestMetric;
