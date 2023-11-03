const jwt = require("jsonwebtoken");

const generateJWT = (email, is_admin,id) => {
  return jwt.sign({ email, is_admin,id }, process.env.JWT_SECRET, {
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
