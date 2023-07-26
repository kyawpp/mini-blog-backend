const bcrypt = require('bcrypt');
const User = require('../models/user');
const logger = require('../utils/logger'); // Require the logger utility

const generateRandomPassword = (username) => {
  const randomPassword = `${username}_$${Math.random().toString(36).substring(2, 15)}`;
  logger.info(`Generated random password for user '${username}': ${randomPassword}`);
  return randomPassword;
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    logger.info(`username:  ${username}` )
    // If the password is not provided, generate a random one
    const hashedPassword = password ? await bcrypt.hash(password, 10) : generateRandomPassword(username);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

module.exports = {
  createUser,
};
