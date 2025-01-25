const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../userModels/userModel");

exports.registerUser = async (req, res) => {
  const { name, email, password, age, weight, height } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with age, weight, and height
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      weight,
      height,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is missing" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your actual JWT secret here

    // Fetch the user from the database using the ID from the decoded token
    const user = await User.findById(
      decoded.id,
      "name email age weight height"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details, including age, weight, and height
    res.status(200).json({
      name: user.name,
      email: user.email,
      age: user.age,
      weight: user.weight,
      height: user.height,
    });
  } catch (error) {
    console.error("Error in getProfile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
