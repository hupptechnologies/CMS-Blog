const User = require("../../models/user");

// Controller to update user access
const updateUserAccessController = async (req, res) => {
  const { id: userId, access } = req.body;

  if (!userId || !access || typeof access !== 'object') {
    return res.status(400).json({ success: false, message: "Invalid input: userId and access object are required" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role === 'moderator' && user.id === userId) {
      return res.status(403).json({ success: false, message: "You can't update access for your own account" });
    }

    user.access = access;
    await user.save();

    res.status(200).json({ success: true, message: "User access updated successfully" });
  } catch (error) {
    console.error("Error updating user access:", error.message);
    res.status(500).json({ success: false, message: "An error occurred while updating user access" });
  }
};

module.exports = { updateUserAccessController };