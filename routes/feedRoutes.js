import express from 'express';
import { create, index, update } from '../controllers/feedsController.js';

const feedRouter = express.Router();

feedRouter.post('/feeds', create);
feedRouter.put('/feeds/:id', update);
feedRouter.get('/feeds', index);


export default feedRouter;