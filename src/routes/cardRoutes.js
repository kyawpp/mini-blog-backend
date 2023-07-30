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

router.get('/', cardController.showCards);

router.get('/:cardId', authMiddleware, cardController.getCard);

router.put('/comment/:cardId', authMiddleware, cardController.addComment);

router.put('/like/:cardId', authMiddleware, cardController.addLike);

router.put('/unlike/:cardId', authMiddleware, cardController.unLike);

module.exports = router;
