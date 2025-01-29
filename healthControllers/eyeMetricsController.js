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

exports.deleteEyeMetric = async (req, res) => {
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
