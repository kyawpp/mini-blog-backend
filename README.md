# mini-blog-backend


Run Docker image for MongoDB

docker build -t mini-blog-backend .
docker run -d -p 27017:27017 --name mini-blog-mongo mini-blog-backend

Export the following env variables
JWT_SECRET=securesecret
PORT=9000
MONGODB_URI=mongodb://localhost:27017/mini-blog
