const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*!]{8,30}$')).required(),
  role: Joi.string().required(), // Add validation for the role field
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*!]{8,30}$')).required(),
});

module.exports = {
  userSchema,
  loginSchema,
};
