const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

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
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      user: {
        type: ObjectId,
        ref: 'User',
      },
      updatedAt: {
        type: Date,
      },
    },
    image: {
      url: String,
      public_id: String,
  },
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
      {
          text: String,
          created: { type: Date, default: Date.now },
          postedBy: {
              type: ObjectId,
              ref: "User",
          },
      },
  ]
  },
  { timestamps: { createdAt: 'createdAt' } }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
