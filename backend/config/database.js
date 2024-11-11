const { Sequelize } = require("sequelize");
const { createFunctionQuery, createLogTableQuery, checkLogTableExistQuery } = require("./query");
require('dotenv').config();

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: process.env.DB_LOGGING === "true" ? true : false,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    const [tableExists] = await sequelize.query(checkLogTableExistQuery);
    if (!tableExists[0].exists) {
      await sequelize.query(createLogTableQuery);
      await sequelize.query(createFunctionQuery);
      console.log("Log table created successfully.");
    };
    await sequelize.sync({ force: false });
    console.log('Database synced successfully (if models exist).');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connectDB();

module.exports = sequelize;
