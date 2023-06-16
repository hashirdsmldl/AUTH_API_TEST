const express = require('express');
const {
  updateUser,
  readUser,
  readUsers,
  deleteUser,
} = require('../controller/user');

const userRoutes = express.Router();

userRoutes
  .get('/', readUsers)
  .get('/:id', readUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser);

module.exports = userRoutes;
