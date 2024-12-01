const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const authRoutes = require("./routes/authRoutes"); // Routes for Authentication
const ocrRoutes = require("./routes/ocrRoutes"); // Routes for OCR
const healthRoutes = require("./routes/healthRoutes"); // Routes for health metrics (Eye, Cholesterol, Blood Test)

// Load environment variables
dotenv.config({ path: "./.env" });

// Replace the <PASSWORD> placeholder with the actual password from DATABASE_PASSWORD
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Initialize the app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable cookies or credentials if needed
  })
);

// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Basic route to check if the server is running
app.get("/", (req, res) => {
  res.send("LivTrack API is running...");
});

// Use authentication routes
app.use("/api/v1/auth", authRoutes);

// Use OCR routes
app.use("/api/v1/ocr", ocrRoutes);

// Use health routes for tracking metrics
app.use("/api/v1/health", healthRoutes);

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

