import express from 'express';
import { create, createReply } from '../controllers/commentController.js';
import isAuth from '../middlewares/isAuth.js';

const commentRouter = express.Router();

commentRouter.post('/comments/:feedId', isAuth, create);
commentRouter.post('/comments/:parentId', isAuth, createReply)

export default commentRouter;