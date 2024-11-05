const { Op } = require("sequelize");
const Blog = require("../../models/blog");
const BlogManage = require("../../models/blogManage");
const sequelize = require("../../config/database");
const Comment = require("../../models/comment");

const fetchAllBlogsController = async (req, res) => {
  const { type, search, startDate, endDate } = req.body;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 4;
  const offset = (page - 1) * limit;
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  try {
    const dateFilter = start && end ? {
      created_at: {
        [Op.between]: [start.toISOString(), end.toISOString()]
      }
    } : {};
    const { count, rows: blogs } = await Blog.findAndCountAll({
      include: [
        {
          model: BlogManage,
          attributes: ["status"],
          where: { status: type ? type : "published" },
          required: true
        }
      ],
      where: {
        ...dateFilter,
        title: {
          [Op.iLike]: `%${search || ''}%`
        }
      },
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);
    const commentCounts = await Comment.findAll({
      attributes: [
        'blog_id',
        [sequelize.fn('COUNT', sequelize.col('id')), 'commentCount']
      ],
      group: 'blog_id',
      raw: true
    });

    const commentCountMap = commentCounts.reduce((acc, { blog_id, commentCount }) => {
      acc[blog_id] = parseInt(commentCount, 10);
      return acc;
    }, {});

    const blogsWithCommentCount = blogs.map(blog => ({
      ...blog.toJSON(),
      comments: commentCountMap[blog.id] || 0,
    }));

    const blogStatusCounts = await BlogManage.findAll({
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("status")), "count"],
      ],
      group: "status",
    });

    const blogStatusCountsFormatted = blogStatusCounts.map((stat) => ({
      type: stat.status,
      count: parseInt(stat.getDataValue("count"), 10),
    }));

    const totalCount = blogStatusCountsFormatted.reduce(
      (acc, curr) => acc + curr.count,
      0
    );

    if (blogs.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No published blogs found", blogs: [], blogStatusCounts: [], totalCount: 0, pagination: {} });
    }

    res.json({ blogs: blogsWithCommentCount, success: true, blogStatusCounts: blogStatusCountsFormatted, totalCount, pagination: { page, limit, totalBlogs: count, totalPages } });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ message: "An error occurred while fetching blogs" });
  }
};

module.exports = { fetchAllBlogsController };