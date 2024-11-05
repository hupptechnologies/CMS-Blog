const { Op } = require('sequelize');
const sequelize = require("../config/database");
const BlogManage = require("../models/blogManage");

// Update blog status
const updateBlogStatus = async () => {
  try {
    await sequelize.authenticate();
    await BlogManage.update(
      {
        status: "published",
        updated_at: new Date(),
      },
      {
        where: {
          status: "scheduled",
          created_at: {
            [Op.lt]: new Date(), // created_at < current date
          },
        },
      }
    );
    console.log("Blog statuses updated successfully.");
  } catch (error) {
    console.error("Error updating blog statuses:", error);
  } finally {
    await sequelize.close();
  }
};

module.exports = updateBlogStatus;