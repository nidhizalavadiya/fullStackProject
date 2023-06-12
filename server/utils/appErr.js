class AppErr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = "Failed";
  }
}

const appErr = (message, statusCode) => {
  let error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = { AppErr, appErr };
