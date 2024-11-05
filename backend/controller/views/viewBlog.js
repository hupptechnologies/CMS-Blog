const Blog = require("../../models/blog");
const View = require("../../models/view");
const { logActivityController } = require("../dashboard/logActivity");

const viewBlogController = async (req, res) => {
  const { user_id, blog_id } = req.body;

  try {
    const existingLike = await View.findOne({ where: { user_id, blog_id } });
    
    if (existingLike) {
      return res.status(200).json({ message: "User has already viewed this blog" });
    }

    await View.create({ user_id, blog_id });

    await Blog.increment('views', { where: { id: blog_id } });
    await logActivityController({ userId: user_id, blogId: blog_id, activityType: 'view', description: "Blog viewed successfully" });
    res.json({ message: "Blog viewed successfully", success: true });
  } catch (error) {
    console.error("Error viewing blog:", error.message);
    res.status(500).json({ message: "An error occurred while viewing the blog" });
  }
};

module.exports = { viewBlogController };