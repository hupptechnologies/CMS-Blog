const User = require("../../models/user");

const getAllAdminsUserController = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.role !== 'moderator') {
        return res.status(404).json({ success: false, message: "You can't access of fetch admins!" });
    }
    const allAdminUsers = await User.findAll({ where: { role: 'admin' }, attributes: ['id', 'status', 'access', 'username', 'img'] });
    res.status(200).json({ allAdminUsers, success: true, message: "Admins fetch successful" });
  } catch (error) {
    console.error("Error during admin fetch:", error.message);
    res.status(500).json({ message: "An error occurred during admin fetch" });
  }
};

module.exports = { getAllAdminsUserController };