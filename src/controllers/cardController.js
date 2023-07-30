const Card = require('../models/card');
const logger = require('../utils/logger');
const { errorCodes, errorMessages } = require('../utils/errorCodes');
const { cardSchema } = require('../utils/validation');
const cloudinary = require('../utils/cloudinary');

// Create a new card
const createCard = async (req, res) => {
  try {
    // Validate the request body using the cardSchema
    const { error } = cardSchema.validate(req.body);
    if (error) {
      logger.warn('Invalid request data during card creation');
      return res.status(400).json({ errorCode: errorCodes.INVALID_REQUEST_DATA, errorMessage: error.details[0].message });
    }
    const author = req.user.id;
    // Ininialize
    const { name, status, content, category, image, likes, comments } = req.body;
    let imageObj = {};

    // Upload image if image is provided
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "cards",
        width: 1200,
        crop: "scale"
      });

      imageObj = {
        public_id: result.public_id,
        url: result.secure_url
      };
      logger.info('Image uploaded successfully.')
    }

    // Create card with the image object
    const card = new Card({
      name,
      status,
      content,
      category,
      author,
      image: imageObj
    });

    await card.save();

    return res.status(201).json({ message: 'Card created successfully', card });
  } catch (error) {
    logger.error(`Error creating card: ${error.message}`);
    return res.status(500).json({ errorCode: errorCodes.INTERNAL_SERVER_ERROR, errorMessage: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

//Edit Card
const editCard = async (req, res) => {
  try {
    // Validate the request body using the cardSchema
    const { error } = cardSchema.validate(req.body);
    if (error) {
      logger.warn('Invalid request data during card creation');
      return res.status(400).json({ errorCode: errorCodes.INVALID_REQUEST_DATA, errorMessage: error.details[0].message });
    }
    const { name, status, content, category } = req.body;
    const { cardId } = req.params;
    logger.info(`Card ID '${cardId}'`)
    const author = req.user.id;
    // Find the card
    const card = await Card.findById(cardId);
    if (!card) {
      logger.warn(`Card with ID '${cardId}' not found`);
      return res.status(404).json({ errorCode: errorCodes.CARD_NOT_FOUND, errorMessage: errorMessages.CARD_NOT_FOUND });
    }

    // Check if the user is authorized to edit the card
    if (card.author.toString() !== author) {
      logger.warn(`User is not authorized to edit the card with ID '${cardId}'`);
      return res.status(403).json({ errorCode: errorCodes.FORBIDDEN, errorMessage: errorMessages.FORBIDDEN });
    }

    // Update the card fields
    card.name = name;
    card.status = status;
    card.content = content;
    card.category = category;

    if (card.author.toString() !== author) {
      card.updatedBy = {
        user: author,
        updatedAt: Date.now(),
      };
    }

    await card.save();

    return res.json({ message: 'Card updated successfully', card });
  } catch (error) {
    logger.error(`Error editing card: ${error.message}`);
    return res.status(500).json({ errorCode: errorCodes.INTERNAL_SERVER_ERROR, errorMessage: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

// Delete a card
const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const author = req.user.id; // Assuming you are using authentication middleware to set the user object in req

    // Find the card and check if the author matches
    const card = await Card.findById(cardId);
    if (!card) {
      logger.warn(`Card with ID '${cardId}' not found`);
      return res.status(404).json({ errorCode: errorCodes.CARD_NOT_FOUND, errorMessage: errorMessages.CARD_NOT_FOUND });
    }

    if (card.author.toString() !== author) {
      logger.warn(`User is not authorized to delete the card with ID '${cardId}'`);
      return res.status(403).json({ errorCode: errorCodes.FORBIDDEN, errorMessage: errorMessages.FORBIDDEN });
    }

    // Delete the card
    await card.remove();

    return res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting card: ${error.message}`);
    return res.status(500).json({ errorCode: errorCodes.INTERNAL_SERVER_ERROR, errorMessage: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

const showCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 }).populate('author', 'username');
    res.status(201).json({
      success: true,
      cards
    })
  } catch (error) {
    logger.error(`Error getting all cards : ${error.message}`);
    return res.status(500).json({ errorCode: errorCodes.INTERNAL_SERVER_ERROR, errorMessage: errorMessages.INTERNAL_SERVER_ERROR });
  }
}
const getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).populate('comments.postedBy', 'username');
    res.status(200).json({
        success: true,
        card
    })
} catch (error) {
  logger.error(`Error getting a card: ${error.message}`);
  return res.status(500).json({ errorCode: errorCodes.INTERNAL_SERVER_ERROR, errorMessage: errorMessages.INTERNAL_SERVER_ERROR });
}
}

module.exports = {
  createCard,
  editCard,
  deleteCard,
  showCards,
  getCard
};
