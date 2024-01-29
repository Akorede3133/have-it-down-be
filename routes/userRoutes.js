import express from 'express';
import { register } from '../controllers/usersController.js';
import { check } from 'express-validator';

const registrationRouter = express.Router();

registrationRouter.post('/register', [
  check('name').notEmpty().withMessage('The name field cannot be empty').trim(),
  check('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  check('password').notEmpty().withMessage('The password must be greater the 6 characters'),
], register);

export default registrationRouter;