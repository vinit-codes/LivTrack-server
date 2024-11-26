const multer = require("multer");

// Set storage options (in-memory storage for simplicity)
const storage = multer.memoryStorage();

// File upload settings
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

// Middleware function for handling uploads
module.exports = upload; // 'image' is the field name in the form
