import express from 'express';
import { create, index, show, update } from '../controllers/feedsController.js';

const feedRouter = express.Router();

feedRouter.post('/feeds', create);
feedRouter.put('/feeds/:id', update);
feedRouter.get('/feeds', index);
feedRouter.get('/feeds/:id', show);



export default feedRouter;