const Blog = require("../../models/blog");
const BlogManage = require("../../models/blogManage");

const updateBlogController = async (req, res) => {
  try {
    const { title, img, categories, status, blog_id } = req.body;

    const blog = await Blog.findByPk(blog_id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    };

    await Blog.update({ title, img, categories, updated_at: new Date() }, {
      where: { id: blog_id }
    });
    await BlogManage.update({ status: status, updated_at: new Date() }, {
      where: { blog_id: blog_id }
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully"
    });
  } catch (error) {
    console.error("Error during update blog:", error);
    res.status(500).json({ message: "An error occurred during blog update" });
  }
};

module.exports = updateBlogController;
