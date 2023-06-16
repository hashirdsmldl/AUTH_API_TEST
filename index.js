const express = require('express');
const { productRoutes } = require('./router/productroutes');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./router/userroutes');
const jwt = require('jsonwebtoken');
const { createUser } = require('./controller/auth');
const authRoutes = require('./router/authroutes');
require('dotenv').config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => console.log(err));

const server = express();

const auth = (req, res, next) => {
  const token = req.get('Authorization').split('Bearer ')[1];
  
  try {
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    if (decoded.userPhone ) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
};

server.use(cors());
server.use(express.json());
server.use('/auth',authRoutes);

server.use('/products',auth, productRoutes); // Use '/product' as the base path for product routes
server.use('/users',auth, userRoutes); // Use '/user' as the base path for user routes

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
