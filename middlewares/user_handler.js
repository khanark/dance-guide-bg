const { sendError } = require('../util/util');
// const userViewModel = require('../view_models/user_view_model');

module.exports = cb => {
  return async (req, res, next) => {
    try {
      let user;
      if (req.params.id) {
        user = await cb(req.params.id);
        console.log(user);
        res.status(200).json(user);
      } else {
        user = await cb(req.body);
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
};
