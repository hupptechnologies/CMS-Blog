const User = require("../models/user");

const checkAdmin = async (req, res, next) => {
  try {
    const { id: userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === 'user') {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  } catch (error) {
    console.error("Error checking admin role:", error.message);
    res.status(500).json({ message: "An error occurred while checking admin role" });
  }
};

module.exports = checkAdmin;