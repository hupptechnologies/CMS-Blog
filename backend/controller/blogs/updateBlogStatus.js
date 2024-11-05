const BlogManage = require("../../models/blogManage");

const updateStatusBlogController = async (req, res) => {
  const { blog_id, status } = req.body;

  if (!blog_id || !status) {
    return res.status(400).json({ message: "Blog ID and status are required" });
  }

  try {
    const [affectedRows] = await BlogManage.update(
      {
        status: status,
        updated_at: new Date(),
      },
      {
        where: { blog_id: blog_id },
      }
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog status updated successfully!",
    });
  } catch (error) {
    console.error("Error during update blog status:", error);
    res.status(500).json({ message: "An error occurred while updating blog status" });
  }
};

module.exports = { updateStatusBlogController };