const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../utils/logger');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      logger.warn('Authentication failed: User not found');
      return res.status(401).json({ error: 'Authentication failed' });
    }
    req.user = user;
    logger.info(`Authentication success for user: ${user.username}`);
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
