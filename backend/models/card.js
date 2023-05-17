const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /(?:https?|ftp)(?::\/\/)(?:(?:[а-яa-z0-9]{1}[а-яa-z0-9-]*)\.){1,}(?:(?:(?:[a-z])+)|(?:(?:[а-я])+))(?:$|(?:\/(?:$|(?:[а-яa-z0-9#?]+[а-яa-z0-9._~:?#[\]@!$&'()*+,;=-]*))))*$/im.test(v),
      message: 'Неправильный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
