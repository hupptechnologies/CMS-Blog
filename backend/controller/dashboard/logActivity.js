const { Op } = require("sequelize");
const Activity = require("../../models/activity");
const Blog = require("../../models/blog");
const User = require("../../models/user");
const sequelize = require("../../config/database");

const logActivityController = async (data) => {
  const { userId, blogId, activityType, description } = data;
  try {
    await Activity.create({
      user_id: userId,
      blog_id: blogId || null,
      activity_type: activityType,
      description: description,
    });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

const countActivityTypesController = async (req, res) => {
  const { startDate, endDate } = req.query;
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  try {
    const dateFilter = start && end ? {
      created_at: {
        [Op.between]: [start.toISOString(), end.toISOString()],
      },
    } : {};
    const activityCounts = await Activity.findAll({
      attributes: [
        "activity_type",
        [sequelize.fn("COUNT", sequelize.col("activity_type")), "count"],
      ],
      where: dateFilter,
      group: "activity_type",
    });
    const activityCountsFormatted = activityCounts.map((activity) => ({
      type: activity.activity_type,
      count: parseInt(activity.getDataValue('count'), 10)
    }));
    const totalCount = activityCountsFormatted.reduce((acc, curr) => acc + curr.count, 0);
    res.status(200).json({
      success: true,
      data: activityCountsFormatted,
      totalCount
    });
  } catch (error) {
    console.error("Error counting activity types:", error);
    res.status(500).json({
      success: false,
      message: "Error counting activity types",
      error: error.message,
    });
  }
};

const fetchAllActivitiesController = async (req, res) => {
  const { type, startDate, endDate } = req.body;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  try {
    const dateFilter = start && end ? {
      created_at: {
        [Op.between]: [start.toISOString(), end.toISOString()]
      }
    } : {};
    const queryOptions = {
      include: [
        {
          model: User,
          attributes: ["username", "email", "img"],
        },
        {
          model: Blog,
          attributes: ["title", "img"],
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order: [['created_at', 'DESC']],
      where: type ? { activity_type: type, ...dateFilter } : dateFilter,
    };
    const { count, rows } = await Activity.findAndCountAll(queryOptions);

    res.status(200).json({
      success: true,
      activities: rows,
      pagination: {
        currentPage: page,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        pageSize: limit,
      }
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching activities",
      error: error.message,
    });
  }
};

module.exports = {
  logActivityController,
  fetchAllActivitiesController,
  countActivityTypesController,
};
