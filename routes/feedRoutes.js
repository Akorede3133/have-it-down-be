import express from 'express';
import { create } from '../controllers/feedsController.js';

const feedRouter = express.Router();

feedRouter.post('/feeds', create);

export default feedRouter;