const { getSingleUser, verifyToken } = require('../services/user_service');
const { isValidObjectId } = require('mongoose');
const { sendError } = require('../util/util');
const userViewModel = require('../view_models/user_view_model');

module.exports = options => {
  return async (req, res, next) => {
    const id = req.params.id;
    try {
      if (!isValidObjectId(id)) {
        sendError("User doesn't exist in the database", 403);
      }
      if (options?.tokenValidator) {
        await verifyToken(req.headers);
      }
      const user = await getSingleUser(id);
      if (!user) {
        sendError("User doesn't exist in the database", 403);
      }
      req.user = userViewModel(user);
      next();
    } catch (error) {
      next(error);
    }
  };
};
