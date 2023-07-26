const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      updatedAt: {
        type: Date,
      },
    },
  },
  { timestamps: { createdAt: 'createdAt' } }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
