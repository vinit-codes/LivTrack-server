const PcosPcod = require("../healthModels/pcosModel");

// Add PCOS/PCOD Metrics
exports.addPcosMetrics = async (req, res) => {
  try {
    const newMetric = await PcosPcod.create({
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

// Get All PCOS/PCOD Metrics for a User
exports.getPcosMetrics = async (req, res) => {
  try {
    const metrics = await PcosPcod.find({ user: req.user.id });
    res.status(200).json({
      status: "success",
      data: { metrics },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Update a Specific PCOS/PCOD Metric
exports.updatePcosMetrics = async (req, res) => {
  try {
    const updatedMetric = await PcosPcod.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Ensure model validation
      }
    );
    if (!updatedMetric) {
      return res
        .status(404)
        .json({ status: "fail", message: "No metric found with that ID" });
    }
    res.status(200).json({
      status: "success",
      data: { metric: updatedMetric },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Delete a PCOS/PCOD Metric
exports.deletePcosMetrics = async (req, res) => {
  try {
    const deletedMetric = await PcosPcod.findByIdAndDelete(req.params.id);
    if (!deletedMetric) {
      return res
        .status(404)
        .json({ status: "fail", message: "No metric found with that ID" });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.deletePcosMetric = async (req, res) => {
  try {
    const metric = await EyeMetric.findByIdAndDelete(req.params.id);
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
exports.getUserHistory = async (req, res) => {
  try {
    const history = await EyeMetric.find({ user: req.user.id })
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
