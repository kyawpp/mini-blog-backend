const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();

// Logger setup
const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });


  // MongoDB Connection
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-blog';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err.message}`);
});
db.once('open', () => {
  logger.info('Connected to MongoDB database');
});
  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});