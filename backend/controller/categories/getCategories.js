const { Op } = require("sequelize");
const Categories = require("../../models/category");
const sequelize = require("../../config/database");

const fetchAllCategoriesController = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  const { type, search } = req.body;

  try {
    // Construct where condition based on type query
    const whereCondition = {
      ...(type && type.trim() !== "" && { status: type.trim() }),
      ...(search && search.trim() !== "" && { name: { [Op.iLike]: `%${search.trim()}%` } }),
    };

    // Fetch categories with pagination
    const { count, rows } = await Categories.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],  // Make sure field names match your model
      limit,
      offset,
    });

    // Count the number of categories by status
    const statusCounts = await Categories.findAll({
      attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'count']],
      group: ['status'],
      raw: true
    });

    // Prepare data for status counts
    const data = statusCounts.map(({ status, count }) => ({
      type: status,
      count: parseInt(count, 10)
    }));

    // Calculate total count from the status counts
    const totalCount = data.reduce((acc, curr) => acc + curr.count, 0);

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    // Send the response
    res.status(200).json({
      success: true,
      categories: rows,
      categoriesStatus: data,
      totalCount,
      pagination: { page, limit, totalCategories: count, totalPages },
    });
  } catch (error) {
    console.error("Error fetching database categories:", error);
    res.status(500).json({ message: "Error fetching database categories", error: error.message });
  }
};

module.exports = fetchAllCategoriesController;