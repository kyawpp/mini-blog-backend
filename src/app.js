const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const app = express();
require("dotenv").config();
var cookieParser = require('cookie-parser');
var cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require("xss-clean");

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

// Middleware
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors());
app.use(mongoSanitize());
// adding security headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)
app.use(xss());

// Routes
const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');
app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);

// Start the server
const port = process.env.PORT || 9000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});