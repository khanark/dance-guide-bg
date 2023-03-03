const globalErrorHandler = require('../middlewares/error_handler');
const userController = require('../controllers/user_controller');

module.exports = app => {
  app.use('/users', userController);
  // app.use('/dance/schools');
  app.use(globalErrorHandler());
};
