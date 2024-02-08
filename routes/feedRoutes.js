import express from 'express';
import { create, index, show, update } from '../controllers/feedsController.js';
import isAuth from '../middlewares/isAuth.js';

const feedRouter = express.Router();

feedRouter.post('/feeds', isAuth, create);
feedRouter.put('/feeds/:id', isAuth, update);
feedRouter.get('/feeds', isAuth, index);
feedRouter.get('/feeds/:id', isAuth, show);



export default feedRouter;