const { verifyJWT } = require("../helpers/generateJwt.js");

function authAdmin(req, res, next) {
  const verify = verifyJWT(req.headers.authorization);
  if (verify.payload.id && verify.payload.is_admin === true) {
    next();
  } else {
    return res.status(403).json({ msg: "Acceso denegado" });
  }
}

module.exports = authAdmin;
