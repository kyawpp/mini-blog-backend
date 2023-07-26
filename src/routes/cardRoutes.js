const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middleware/authMiddleware');
// Create a new card (authenticated route)
router.post('/', authMiddleware, cardController.createCard);

// Edit a card (authenticated route)
router.put('/:cardId', authMiddleware, cardController.editCard);

// Delete a card (authenticated route)
router.delete('/:cardId', authMiddleware, cardController.deleteCard);

module.exports = router;
