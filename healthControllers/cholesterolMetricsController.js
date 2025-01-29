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
exports.deleteCholesterolMetric = async (req, res) => {
  try {
    const metric = await CholesterolMetric.findByIdAndDelete(req.params.id);
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
    const history = await CholesterolMetric.find({ user: req.user.id })
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
