const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Blog = require('./blog');

const BlogManage = sequelize.define('BlogManage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Blog,
      key: 'id',
    },
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('draft', 'scheduled', 'published', 'archived', 'deleted'),
    allowNull: false,
    defaultValue: 'draft',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'blog_manage',
  timestamps: false,
});

// Define associations
BlogManage.belongsTo(Blog, { foreignKey: 'blog_id' });
Blog.hasOne(BlogManage, { foreignKey: 'blog_id' });

module.exports = BlogManage;