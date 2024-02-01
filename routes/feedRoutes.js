import express from 'express';
import { create, update } from '../controllers/feedsController.js';

const feedRouter = express.Router();

feedRouter.post('/feeds', create);
feedRouter.put('/feeds/:id', update);

export default feedRouter;