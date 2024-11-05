const Categories = require("../../models/category");

const createCategoryController = async (req, res) => {
  const { catName, description } = req.body;
  if (!catName) {
    return res.status(400).json({ message: "CatName must be provided", success: false });
  }

  try {
    const existingCategory = await Categories.findOne({
      where: {
        name: catName
      },
    });

    if (existingCategory) {
      await Categories.update({
        description: description,
        status: "active",
        updated_at: new Date(),
      }, {
        where: {
          name: catName
        }
      });
      return res
        .status(200)
        .json({ message: "Category updated successfully.", success: true });
    }
    if (catName) {
      await Categories.create({
        name: catName,
        description: description,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    res.status(201).json({ message: "Category created successfully", success: true });
  } catch (error) {
    console.error("Error during create category:", error);
    res.status(500).json({message: "An error occurred during creation of category",error: error.message });
  }
};

module.exports = createCategoryController;
