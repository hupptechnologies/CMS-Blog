const User = require("../../models/user");

const deleteUserController = async (req, res) => {
  const { userId, type } = req.query;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (type === 'active' || type === 'inactive') {
      user.status = 'banned';
    } else {
      user.status = 'inactive';
    }
    await user.save();
    res.status(200).json({ success: true, message: (type === 'active' || type === 'inactive') ? `User has been deactivated!` : `User has been activated!` });
  } catch (error) {
    console.error("Error during user deactivation:", error.message);
    res.status(500).json({ message: "An error occurred during user deactivation" });
  }
};

module.exports = deleteUserController;