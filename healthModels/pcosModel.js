const mongoose = require("mongoose");

const PcosPcodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hormones: {
    lh: Number,
    fsh: Number,
    estradiol: Number,
    testosterone: Number,
    androstenedione: Number,
    dhea_s: Number,
    amh: Number,
  },
  thyroid: {
    tsh: Number,
    free_t3: Number,
    free_t4: Number,
  },
  glucoseInsulin: {
    fasting_glucose: Number,
    fasting_insulin: Number,
    homa_ir: Number,
  },
  prolactin: Number,
  healthMetrics: {
    weight: Number,
    bmi: Number,
    waist_to_hip_ratio: Number,
  },
  cycleDetails: {
    menstrual_cycle_length: Number,
    days_of_bleeding: Number,
    period_irregularity: Boolean,
    ovulation_tracking: Boolean,
  },
  generalHealth: {
    vitamin_d: Number,
    lipid_profile: {
      total_cholesterol: Number,
      ldl: Number,
      hdl: Number,
      triglycerides: Number,
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const PcosPcod = mongoose.model("PcosPcod", PcosPcodSchema);

module.exports = PcosPcod;
