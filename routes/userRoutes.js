import express from 'express';
import { currentUser, register } from '../controllers/usersController.js';
import { check } from 'express-validator';
import isAuth from '../middlewares/isAuth.js';

const userRouter = express.Router();

userRouter.post('/register', [
  check('name').notEmpty().withMessage('The name field cannot be empty').trim(),
  check('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  check('password').notEmpty().withMessage('The password must be greater the 6 characters'),
], register);

userRouter.get('/currenUser', isAuth, currentUser);


export default userRouter;