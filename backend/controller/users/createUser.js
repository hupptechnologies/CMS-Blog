const User = require("../../models/user");
const { logActivityController } = require("../dashboard/logActivity");
const bcrypt = require("bcryptjs");

const createUserController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await logActivityController({ userId: newUser.id, blogId: null, activityType: 'signup', description: "User create successful" });
    res.status(201).json({ newUser, success: true, message: "User create successful" });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "An error occurred during signup" });
  }
};

module.exports = { createUserController };