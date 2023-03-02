const errorParser = err => {
  if (err.name == 'ValidationError') {
    return Object.values(err.errors)[0].message;
  } else {
    return err.message;
  }
};

module.exports = () => {
  return (err, req, res, next) => {
    const msg = errorParser(err);
    const errorCode = err.cause || 500;
    res.status(errorCode).json({ message: msg });
  };
};
