const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Set unique index for username
  email: { type: String, required: true, unique: true }, // Set unique index for email
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  datecreated: { type: Date, required: true, default: Date.now },
});

userSchema.index({ username: 1, email: 1 }, { unique: true }); // Set unique compound index for username and email

module.exports = mongoose.model('User', userSchema);
