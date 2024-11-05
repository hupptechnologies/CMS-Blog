const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Blog = require('./blog');
const User = require('./user');
const Reply = require('./reply');

const Comment = sequelize.define('Comment', {
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
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('delivered', 'pending', 'deleted'),
    allowNull: false,
    defaultValue: 'pending',
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
  tableName: 'comments',
  timestamps: false,
});

// Define associations
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });
Blog.hasMany(Comment, { foreignKey: 'blog_id' });

Comment.hasMany(Reply, { foreignKey: 'comment_id', as: 'replies' });
Reply.belongsTo(Comment, { foreignKey: 'comment_id' });

Comment.belongsTo(User, { foreignKey: 'author_id' });
User.hasMany(Comment, { foreignKey: 'author_id' });

module.exports = Comment;