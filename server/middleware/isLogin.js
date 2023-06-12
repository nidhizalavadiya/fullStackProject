const { AppErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);

  // verify token
  const decodedUser = verifyToken(token);

  // save user into req obj
  req.user = decodedUser.id;
  if (!decodedUser) {
    return next(
      new AppErr("Invalid or expired token, please login again", 401)
    );
  }
  next();
};

module.exports = isLogin;
