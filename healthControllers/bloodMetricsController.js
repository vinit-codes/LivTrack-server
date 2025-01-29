const BloodMetric = require("../healthModels/bloodMetricModel");

// Add Blood Metrics
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

// Get All Blood Metrics for a User
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

// Update Blood Metrics
exports.updateBloodMetrics = async (req, res) => {
  try {
    const updatedMetric = await BloodMetric.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Ensure model validation
    );
    res.status(200).json({
      status: "success",
      data: { metric: updatedMetric },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Get User History for Graphing
exports.getUserHistory = async (req, res) => {
  try {
    const history = await BloodMetric.find({ user: req.user.id })
      .sort({ createdAt: 1 }) // Sort by date (oldest to newest)
      .select("createdAt cholesterol glucose bloodPressure"); // Fetch only relevant fields

    res.status(200).json({
      status: "success",
      data: { history },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Delete a Blood Metric Entry
exports.deleteBloodMetric = async (req, res) => {
  try {
    const metric = await BloodMetric.findByIdAndDelete(req.params.id);
    if (!metric) {
      return res
        .status(404)
        .json({ status: "fail", message: "Metric not found" });
    }
    res.status(204).json({ status: "success", data: null }); // 204 means no content
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
