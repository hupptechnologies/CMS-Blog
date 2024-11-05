const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Reply = sequelize.define('Reply', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "comments",
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'replies',
  timestamps: false,
});

Reply.belongsTo(User, { foreignKey: 'author_id' });
User.hasMany(Reply, { foreignKey: 'author_id' });

module.exports = Reply;