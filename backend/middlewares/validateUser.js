const User = require('../models/user');

const validateUser = async (req, res, next) => {
  const { author_id } = req.body;

  try {
    const user = await User.findByPk(author_id);
    if (!user) {
      return res.status(404).json({ message: "User not found. Please log in.", success: false });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error validating user:", error);
    res.status(500).json({ message: "Error validating user" });
  }
};

module.exports = validateUser;
