export const errorResponserHandler = (err, req, res, next) => {
  const status = err.statusCode || 400;
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const invalidPathHandler = (req, res, next) => {
  const error = new Error("Invalid Path");
  error.statusCOde = 400;
  next(error);
};
