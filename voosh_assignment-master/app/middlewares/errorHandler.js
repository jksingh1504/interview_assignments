function errorHandler(err, req, res, next) {
  if (typeof err === "string")
    return res.status(400).json({ message: err, error: true });
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";
  return res.status(statusCode).json({ message: errorMessage, error: true });
}

module.exports = { errorHandler };
