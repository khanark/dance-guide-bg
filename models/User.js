const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');
const validator = require('validator');

// TODO: If there is time left implement upload for the avatar

const userSchema = new Schema({
  avatar: {
    type: String,
    required: true,
    match: [/^https?:\/\//, 'Invalid avatar format'],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (adress) {
        return validator.isEmail(adress);
      },
      message: 'Invalid email adress',
    },
  },
  name: {
    type: String,
    required: true,
    minLength: [3, 'Name should be minimum 3 characters long'],
  },
  surname: {
    type: String,
    required: true,
    minLength: [3, 'Surname should be minimum 3 characters long'],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, 'Password should be minimum 4 characters long'],
  },
  moreInfo: {
    type: String,
  },
});

module.exports = model('User', userSchema);
