const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Blog = require('./blog');

const View = sequelize.define('View', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    primaryKey: true
  },
  blog_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Blog,
      key: 'id'
    },
    primaryKey: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'views'
});

View.belongsTo(User, { foreignKey: 'user_id' });
View.belongsTo(Blog, { foreignKey: 'blog_id' });

module.exports = View;