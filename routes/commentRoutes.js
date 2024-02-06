import express from 'express';
import { create } from '../controllers/commentController';

const commentRouter = express.Router();

commentRouter.post('/comments/:feedId/:parentId', create);

export default commentRouter;