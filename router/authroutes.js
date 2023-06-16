const express=require('express');
const { createUser, loginUser } = require('../controller/auth');

const authRoutes=express.Router();

authRoutes.post('/signup',createUser).post('/login',loginUser);

module.exports=authRoutes;