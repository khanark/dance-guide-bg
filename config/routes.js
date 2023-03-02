const globalErrorHandler = require('../middlewares/error_handler');

module.exports = app => {
  app.use('/users');
  app.use('/dance/schools');
  app.use(globalErrorHandler());
};
