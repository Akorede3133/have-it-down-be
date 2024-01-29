import express from 'express';
import { login } from '../controllers/authController.js';
import { check } from 'express-validator';

const authrouter = express.Router();

authrouter.post('/login', [
  check('email').notEmpty().withMessage('Email field cannot be empty').isEmail().withMessage('Provide a valid email'),
  check('password').notEmpty().withMessage('Password field cannot be empty')
], login);

export default authrouter;
