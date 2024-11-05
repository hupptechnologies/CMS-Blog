const { Op } = require("sequelize");
const User = require("../../models/user");

const fetchAllUsersController = async (req, res) => {
  try {
    const userId = req.query.id;
    const searchQuery = req.query.search || '';
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const searchFilter = searchQuery ? {
      [Op.or]: [
        { username: { [Op.iLike]: `%${searchQuery}%` } },
        { email: { [Op.iLike]: `%${searchQuery}%` } }
      ]
    } : {};

    const dateFilter = startDate && endDate ? {
      created_at: {
        [Op.between]: [startDate.toISOString(), endDate.toISOString()]
      }
    } : {};

    const { role } = await User.findByPk(userId);

    if (!role) {
      return res.status(404).json({ message: "User not found" });
    }

    let users;
    const filter = { ...searchFilter, ...dateFilter };
    if (['active', 'inactive', 'banned'].includes(req.query.type)) {
      filter.status = req.query.type;
    }

    if (role === 'admin' || role === 'moderator') {
      users = await User.findAll({ where: filter });
    } else if (role === 'user') {
      users = await User.findAll({ where: { role: 'user', ...filter } });
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    if (users.length === 0) {
      return res.status(200).json({ message: "No users found", success: false, users: [], userTypes: [], totalCount: 0 });
    }

    const statusCounts = users.reduce((counts, user) => {
      counts[user.status] = (counts[user.status] || 0) + 1;
      return counts;
    }, {});

    const availableTypes = ['active', 'inactive', 'banned']
      .filter(type => statusCounts[type])
      .map(type => ({ type, count: statusCounts[type] }));

    const totalCount = availableTypes.reduce((acc, curr) => acc + curr.count, 0);

    res.json({ users, success: true, userTypes: availableTypes, totalCount });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
};

module.exports = { fetchAllUsersController };