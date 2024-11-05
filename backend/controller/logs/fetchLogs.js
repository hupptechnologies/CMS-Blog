const { Op } = require("sequelize");
const Log = require("../../models/log");

const fetchAllLogsController = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  const { type, startDate, endDate } = req.query;

  try {
    // Parse and validate dates
    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;

    // Validate dates
    if ((startDate && isNaN(start.getTime())) || (endDate && isNaN(end.getTime()))) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Build where condition
    const whereCondition = {
      ...(type && type.trim() !== "" ? {
        additional_info: {
          [Op.contains]: { status: parseInt(type, 10) },
        },
      } : {}),
      ...(start && end ? {
        created_at: {
          [Op.between]: [start.toISOString(), end.toISOString()],
        },
      } : {}),
    };

    // Fetch logs with pagination and filters
    const { count, rows } = await Log.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      limit,
      offset,
    });

    // Calculate status counts
    const allRows = await Log.findAll({ where: whereCondition });
    const statusCounts = allRows.reduce((acc, log) => {
      if (log.additional_info) {
        try {
          const info = log.additional_info;
          if (info.status) {
            const status = info.status.toString();
            acc[status] = (acc[status] || 0) + 1;
          }
        } catch (e) {
          console.error("Error parsing additional_info:", e);
        }
      }
      return acc;
    }, {});

    // Transform status counts to the desired format
    const data = Object.entries(statusCounts).map(([status, count]) => ({
      type: status,
      count,
    }));
    const totalCount = data.reduce((acc, curr) => acc + curr.count, 0);

    // Send response
    res.status(200).json({
      success: true,
      logs: rows,
      logStatus: data,
      totalCount,
      pagination: { page, limit, totalLogs: count, totalPages: Math.ceil(count / limit) },
    });
  } catch (error) {
    console.error("Error fetching database logs:", error);
    res.status(500).json({ message: "Error fetching database logs" });
  }
};

module.exports = fetchAllLogsController;
