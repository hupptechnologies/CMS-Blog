const { Op } = require("sequelize");
const Blog = require("../../models/blog");
const Categories = require("../../models/category");
const BlogManage = require("../../models/blogManage");

const deleteCategoryController = async (req, res) => {
  const { catId } = req.query;
  if (!catId) {
    return res.status(400).json({ message: "catId must be provided", success: false });
  }

  try {
    const blogs = await Blog.findAll({
      where: {
        categories: {
          [Op.contains]: [catId]
        }
      }
    });

    const blogUpdates = [];

    for (const blog of blogs) {
      if (blog.categories.length === 1 && blog.categories[0] === catId) {
        blogUpdates.push(BlogManage.update({ status: 'deleted' }, { where: { blog_id: blog.id } }), Blog.update({ categories: [] }, { where: { id: blog.id } }));
      } else {
        const updatedCategories = blog.categories.filter(id => id !== catId);
        blogUpdates.push(Blog.update({ categories: updatedCategories }, { where: { id: blog.id } }));
      }
    }

    await Promise.all(blogUpdates);
    await Categories.destroy({ where: { id: catId } });
    res.status(200).json({ message: `Category ${catId} deleted successfully`, success: true });
  } catch (error) {
    console.error("Error during deleted category:", error);
    res.status(500).json({ message: "An error occurred during deletion of category", error: error.message });
  }
};

module.exports = deleteCategoryController;