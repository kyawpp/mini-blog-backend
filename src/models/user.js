const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true }, // Set unique index for email
  password: { type: String, required: [true, 'password is required'], minlength: [6, 'Password must have at least (6) caracters'] },
  role: { type: String, required: true, default: 'author' },
  datecreated: { type: Date, required: true, default: Date.now },
});

userSchema.index({email: 1 }, { unique: true });

//encrypting password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
      next();
  }
  this.password = await bcrypt.hash(this.password, 10)
})


// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// return a JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: 3600
  });
}

module.exports = mongoose.model('User', userSchema);
