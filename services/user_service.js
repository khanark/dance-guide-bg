const util = require('util');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/User');
const { sendError } = require('../util/util');
const userViewModel = require('../view_models/user_view_model');

const jwt = {
  sign: util.promisify(jsonwebtoken.sign),
  verify: util.promisify(jsonwebtoken.verify),
};

const SECRET = 'dwad12ddas';

const register = async ({ email, password, firstName, lastName, phoneNumber }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phoneNumber,
  });
  await user.save();
  const token = await createToken(user);
  return userViewModel(user, token);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).lean();
  console.log(user);
  if (!Boolean(user)) {
    throw new Error('Wrong username or password', { cause: 401 });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Wrong username or password', { cause: 401 });
  }
  const token = await createToken(user);
  return userViewModel(user, token);
};

const createToken = async ({ _id, email, firstName, lastName, phoneNumber }) => {
  const payload = {
    _id,
    email,
    firstName,
    lastName,
    phoneNumber,
  };
  const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });
  return token;
};

const verifyToken = async headers => {
  const token = headers['x-authorization'];
  if (!token) {
    sendError('No authorization', 401);
  }
  const decodedUser = await jwt.verify(token, SECRET);
  const existingUser = await User.findById(decodedUser._id);
  if (!existingUser) {
    sendError('No authorization', 401);
  }
  return decoded;
};

const getSingleUser = async id => {
  const user = await User.findById(id).lean();
  return userViewModel(user);
};

const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { runValidators: true });
};

module.exports = {
  register,
  login,
  verifyToken,
  getSingleUser,
  updateUser,
};
