const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'barber'],
      default: 'user'
    }
  },  // First argument (fields) closes here
  {  // Second argument (options) starts here
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);