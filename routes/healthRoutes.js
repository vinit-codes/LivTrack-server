const express = require("express");
const router = express.Router();
const eyeMetricsController = require("../healthControllers/eyeMetricsController");
const cholesterolMetricsController = require("../healthControllers/cholesterolMetricsController");
const bloodMetricsController = require("../healthControllers/bloodMetricsController");
const pcosController = require("../healthControllers/pcosController");
const authMiddleware = require("../middleware/authMiddleware"); // Assuming you have an auth middleware

// Eye Metrics Routes
router.post(
  "/eye-metrics",
  authMiddleware.protect,
  eyeMetricsController.addEyeMetrics
);
router.get(
  "/eye-metrics",
  authMiddleware.protect,
  eyeMetricsController.getEyeMetrics
);
router.put(
  "/eye-metrics/:id",
  authMiddleware.protect,
  eyeMetricsController.updateEyeMetrics
);

// Cholesterol Metrics Routes
router.post(
  "/cholesterol-metrics",
  authMiddleware.protect,
  cholesterolMetricsController.addCholesterolMetrics
);
router.get(
  "/cholesterol-metrics",
  authMiddleware.protect,
  cholesterolMetricsController.getCholesterolMetrics
);
router.put(
  "/cholesterol-metrics/:id",
  authMiddleware.protect,
  cholesterolMetricsController.updateCholesterolMetrics
);

// Blood Metrics Routes
router.post(
  "/blood-metrics",
  authMiddleware.protect,
  bloodMetricsController.addBloodMetrics
);
router.get(
  "/blood-metrics",
  authMiddleware.protect,
  bloodMetricsController.getBloodMetrics
);
router.put(
  "/blood-metrics/:id",
  authMiddleware.protect,
  bloodMetricsController.updateBloodMetrics
);

//PCOS Metrcis Routes
router.post("/pcos-metrics", authMiddleware.protect, pcosController.addPcosMetrics);
router.get("/pcos-metrics", authMiddleware.protect, pcosController.getPcosMetrics);
router.patch("/pcos-metrics/:id", authMiddleware.protect, pcosController.updatePcosMetrics);
router.delete("/pcosmetrics/:id", authMiddleware.protect, pcosController.deletePcosMetrics);

module.exports = router;
