import express from 'express';
import { create } from '../controllers/commentController.js';
import isAuth from '../middlewares/isAuth.js';

const commentRouter = express.Router();

commentRouter.post('/comments/:feedId', isAuth, create);
// commentRouter.post('replies/:parentId')

export default commentRouter;