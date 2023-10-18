const jwt = require("jsonwebtoken");

const generateJWT = (id, is_admin) => {
  return jwt.sign({ id, is_admin }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });
};
const verifyJWT = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return { payload };
  } catch (error) {
    return { error };
  }
};

module.exports = { generateJWT, verifyJWT };
