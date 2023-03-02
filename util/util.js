module.exports = {
  sendError,
};

const sendError = (err, code) => {
  throw new Error(err, { cause: code });
};
