const mongoose = require('mongoose');

var Contact = mongoose.model('Contact', {
  name: {
    required: true,
    type: String,
    minlength: 2,
    trim: true
  },
  email: {
    required: true,
    type: String,
    minlength: 5,
    trim: true
  },
  number: {
    required: true,
    type: String,
    minlength: 9,
    trim: true
  }
});

module.exports = {Contact};
