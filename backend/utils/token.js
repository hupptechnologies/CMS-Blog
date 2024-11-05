require('dotenv').config();
const jwt = require("jsonwebtoken");

const tokenGenerate = ({ user }) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { tokenGenerate };
