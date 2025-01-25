// Import necessary modules
const User = require("../models/userModel"); // Assuming a Mongoose model
const jwt = require("jsonwebtoken");

// Fetch Profile Controller
const getProfile = async (req, res) => {
  try {
    // Extract the token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is missing" });
    }

    // Verify the token
    const decoded = jwt.verify(token, "vineeth10"); // Replace with your actual JWT secret

    // Fetch the user from the database
    const user = await User.findOne({ email: decoded.email }, "name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile };
