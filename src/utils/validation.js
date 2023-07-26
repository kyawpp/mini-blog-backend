const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*!]{8,30}$')).required(),
  role: Joi.string().required(), 
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*!]{8,30}$')).required(),
});

const cardSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
});


module.exports = {
  userSchema,
  loginSchema,
  cardSchema
};
