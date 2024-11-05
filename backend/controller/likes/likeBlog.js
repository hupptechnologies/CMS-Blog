const Blog = require("../../models/blog");
const Like = require("../../models/like");
const { logActivityController } = require("../dashboard/logActivity");

const likeBlogController = async (req, res) => {
  const { user_id, blog_id } = req.body;

  try {
    const existingLike = await Like.findOne({ where: { user_id, blog_id } });
    
    if (existingLike) {
      return res.status(200).json({ message: "User has already liked this blog" });
    }

    await Like.create({ user_id, blog_id });

    await Blog.increment('likes', { where: { id: blog_id } });
    await logActivityController({ userId: user_id, blogId: blog_id, activityType: 'like', description: "Blog liked successfully" });
    res.json({ message: "Blog liked successfully", success: true });
  } catch (error) {
    console.error("Error liking blog:", error.message);
    res.status(500).json({ message: "An error occurred while liking the blog" });
  }
};

module.exports = { likeBlogController };