const User = require("../../models/user");
const { logActivityController } = require("../dashboard/logActivity");
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const { tokenGenerate } = require("../../utils/token");

const loginUserController = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    if (user.status === 'banned') {
      return res.status(400).json({ message: "Your account banned by admin please contact to support team." });
    }
    user.status = 'active';
    await user.save();
    await logActivityController({ userId: user.id, blogId: null, activityType: 'login', description: "Login successful" });
    res.json({ success: true, message: "Login successful", token: tokenGenerate({ user }), user });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

const logoutUserController = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.status = 'inactive';
    await user.save();
    await logActivityController({ userId: user.id, blogId: null, activityType: 'logout', description: "Logout successful" });
    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ message: "An error occurred during logout" });
  }
};

const getUserStatisticsController = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { status: 'active' } });
    const now = new Date();
    const yesterday = new Date(now - 24 * 60 * 60 * 1000);
    const newUsersCount = await User.count({
      where: { created_at: { [Op.gt]: yesterday }}
    });
    const data = { totalUsers, activeUsers, newUsersCount }
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching user statistics:", error.message);
    res.status(500).json({ message: "An error occurred while fetching user statistics" });
  }
};

module.exports = { loginUserController, logoutUserController, getUserStatisticsController };
