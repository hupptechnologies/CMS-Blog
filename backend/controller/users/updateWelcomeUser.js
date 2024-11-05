const User = require("../../models/user");

const deActivateWelcomeMessageUserController = async (req, res) => {
  const { id: userId } = req.query;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.has_seen_welcome_message = true;
    await user.save();
    res.status(200).json({ success: true, message: 'User welcome message deactivated!' });
  } catch (error) {
    console.error("Error during user deactivation:", error.message);
    res.status(500).json({ message: "An error occurred during user deactivation" });
  }
};

module.exports = deActivateWelcomeMessageUserController;