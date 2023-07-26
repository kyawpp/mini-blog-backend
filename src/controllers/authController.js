const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../utils/logger');
const validation = require('../utils/validation');
const { errorCodes, errorMessages } = require('../utils/errorCodes');

const generateRandomPassword = (username) => {
  const randomPassword = `${username}_$${Math.random().toString(36).substring(2, 15)}`;
  logger.info(`Generated random password for user '${username}': ${randomPassword}`);
  return randomPassword;
};

const createUser = async (req, res) => {
    try {
      // Validate the request data
      const { error } = validation.userSchema.validate(req.body);
      if (error) {
        logger.warn(`Invalid request data during user creation: ${error.message}`);
        return res.status(400).json({ errorCode: errorCodes.INVALID_REQUEST_DATA, errorMessage: errorMessages.INVALID_REQUEST_DATA });
      }
  
      const { username, email, password, role } = req.body;
  
      // If the password is not provided, generate a random one
      const hashedPassword = password ? await bcrypt.hash(password, 10) : generateRandomPassword(username);
  
      // Create a new User instance
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 'author',
        datecreated: new Date(),
      });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
        logger.warn(`Username '${req.body.username}' already exists`);
        return res.status(409).json({ errorCode: errorCodes.USERNAME_ALREADY_EXISTS, errorMessage: errorMessages.USERNAME_ALREADY_EXISTS });
      } else if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        logger.warn(`Email '${req.body.email}' already exists`);
        return res.status(409).json({ errorCode: errorCodes.EMAIL_ALREADY_EXISTS, errorMessage: errorMessages.EMAIL_ALREADY_EXISTS });
      }
  
      logger.error(`Error creating user: ${error.message}`);
      res.status(500).json({ errorCode: errorCodes.INTERNAL_SERVER_ERROR, errorMessage: errorMessages.INTERNAL_SERVER_ERROR });
    }
  };
  
  

const loginUser = async (req, res) => {
    try {
      // Validate the request data against the loginSchema
      const { error } = validation.loginSchema.validate(req.body);
      if (error) {
        logger.warn(`Invalid request data during login: ${error.message}`);
        return res.status(400).json({ errorCode: errorCodes.INVALID_REQUEST_DATA, errorMessage: errorMessages.INVALID_REQUEST_DATA });
      }
  
      const { username, password } = req.body;
  
      // Check if the user with the provided username exists
      const user = await User.findOne({ username });
      if (!user) {
        logger.warn('Login failed: Invalid credentials');
        return res.status(401).json({ errorCode: errorCodes.USER_NOT_FOUND, errorMessage: errorMessages.USER_NOT_FOUND });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        logger.warn('Login failed: Invalid credentials');
        return res.status(401).json({ errorCode: errorCodes.INVALID_CREDENTIALS, errorMessage: errorMessages.INVALID_CREDENTIALS });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Create the response object with user details and token
      const response = {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          datecreated: user.datecreated,
        },
        token,
      };
  
      res.status(200).json(response);
    } catch (error) {
      logger.error(`Error during login: ${error.message}`);
      res.status(500).json({ errorCode: errorCodes.INTERNAL_SERVER_ERROR, errorMessage: errorMessage.INTERNAL_SERVER_ERROR });
    }
  };
  

module.exports = {
  createUser,
  loginUser,
};
