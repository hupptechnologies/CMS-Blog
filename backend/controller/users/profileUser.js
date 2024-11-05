const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const fetchUserProfileController = async (req, res) => {
  try {
    const userId = req.query.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user, success: true });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user profile" });
  }
};

const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.query.id;
    const { username, img, email, password } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword || user.password;
    }

    user.username = username || user.username;
    user.img = img || user.img;
    user.email = email || user.email

    await user.save();
    res.json({ success: true, message: "Profile updated successfull" });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while updating user profile" });
  }
};

module.exports = { fetchUserProfileController, updateUserProfileController };
