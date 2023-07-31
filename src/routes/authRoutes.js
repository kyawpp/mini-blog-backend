const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createUser, loginUser, logoutUser, userProfile } = require('../controllers/authController');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/profile', authMiddleware ,userProfile);

module.exports = router;
