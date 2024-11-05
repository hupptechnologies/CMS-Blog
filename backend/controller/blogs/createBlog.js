const Blog = require("../../models/blog");
const BlogManage = require("../../models/blogManage");

const createBlogController = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    const newBlogManage = await BlogManage.create({
      blog_id: newBlog.id,
      status: 'draft'
    });
    res.status(201).json({ newBlog, success: true, message: "Blog create successful" });

    if (req.query.status === 'published') {
      await BlogManage.update({ status: 'published', created_at: new Date() }, {
        where: { id: newBlogManage.id }
      });
      await Blog.update({ updated_at: new Date() }, {
        where: { id: newBlog.id }
      });
    };

  } catch (error) {
    console.error("Error during create blog:", error);
    res.status(500).json({ message: "An error occurred during create blog" });
  }
};

module.exports = { createBlogController };