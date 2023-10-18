  function authAdmin(req, res, next) {
    console.log(req.token);
    if (req.user && req.user.is_admin === true) {
        console.log(" AUTH");
      next();
    } else {
        
      return res.status(403).json({ error: "Unauthorized access" });
    }
  }
  
  module.exports = authAdmin ;