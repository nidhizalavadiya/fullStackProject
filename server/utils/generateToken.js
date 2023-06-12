const jwt = require("jsonwebtoken");

const generateWebToken = (id) => {
  return jwt.sign({ id }, "anykey", { expiresIn: "10d" });
};

module.exports = generateWebToken;
