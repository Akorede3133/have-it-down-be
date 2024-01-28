import express from 'express';
import { register } from '../controllers/usersController';

const router = express.Router();

router.post('/register', register)