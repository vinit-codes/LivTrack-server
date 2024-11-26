const CholesterolMetric = require("../healthModels/cholesterolMetricModel");

exports.addCholesterolMetrics = async (req, res) => {
  try {
    const newMetric = await CholesterolMetric.create({
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

exports.getCholesterolMetrics = async (req, res) => {
  try {
    const metrics = await CholesterolMetric.find({ user: req.user.id });
    res.status(200).json({
      status: "success",
      data: { metrics },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateCholesterolMetrics = async (req, res) => {
  try {
    const updatedMetric = await CholesterolMetric.findByIdAndUpdate(
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
