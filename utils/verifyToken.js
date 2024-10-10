
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
    return res.redirect('/')
      return res
        .status(401)
        .json({ msg: "No token, authorization denied", status: 0 });
    }
    

    const decoded = jwt.verify(token, "userToken");
    req.user = decoded;
    
    next();
  } catch (err) {
    console.error("Token verification error: ", err);
    return res.status(401).json({ msg: "Invalid token", status: 0 });
  }
};

module.exports = verifyToken;
