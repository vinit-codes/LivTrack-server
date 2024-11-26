const BloodMetric = require("../healthModels/bloodMetricModel");

exports.addBloodMetrics = async (req, res) => {
  try {
    const newMetric = await BloodMetric.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json({
      status: "success",
      data: { metric: newMetric },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getBloodMetrics = async (req, res) => {
  try {
    const metrics = await BloodMetric.find({ user: req.user.id });
    res.status(200).json({
      status: "success",
      data: { metrics },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateBloodMetrics = async (req, res) => {
  try {
    const updatedMetric = await BloodMetric.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Ensure model validation
      }
    );
    res.status(200).json({
      status: "success",
      data: { metric: updatedMetric },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
