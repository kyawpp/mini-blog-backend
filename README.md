# Mini Blog Backend

This is the backend service for Mini Blog app.

# Install
Make sure you have Node.js installed. Unzip the file

```sh
cd mini-blog-backend
npm install

```
# Docker for MongoDB

```sh
docker build -t mini-blog-db .
docker run -d -p 27017:27017 --name mini-blog-mongo mini-blog-db
```

# Run the server
```sh
npm start
```

# API Testing with Postman

Import the following files in Postman Application for API testing. 

1. mini-blog-dev.postman_environment.json and 
2. mini-blog-dev.postman_environment.json

Replace the cardId and tokens accordingly.

For testing purposes, I've added the required keys for Cloudinary in .env file.

