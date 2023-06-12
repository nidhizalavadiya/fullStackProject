const getTokenFromHeader = (req) => {
  // how to get token from header
  const headerObj = req.headers;
  const token = headerObj["authorization"].split(" ")[1];

  if (token !== undefined) {
    return token;
  } else {
    return {
      status: "failed",
      message: "No token attached to header",
    };
  }
};

module.exports = getTokenFromHeader;
