const EyeMetric = require("../healthModels/eyeMetricModel");

exports.addEyeMetrics = async (req, res) => {
  try {
    const newMetric = await EyeMetric.create({
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

exports.getEyeMetrics = async (req, res) => {
  try {
    const metrics = await EyeMetric.find({ user: req.user.id });
    res.status(200).json({
      status: "success",
      data: { metrics },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateEyeMetrics = async (req, res) => {
  try {
    const updatedMetric = await EyeMetric.findByIdAndUpdate(
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
