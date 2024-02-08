import express from 'express';
import { create, createCommentClap, destroy } from '../controllers/clapController.js';
import isAuth from '../middlewares/isAuth.js';

const clapRouter = express.Router();

clapRouter.post('/claps/:feedId', isAuth, create);
clapRouter.delete('/claps/:feedId/:userId', isAuth, destroy);
clapRouter.put('/claps/:commentId', isAuth, createCommentClap);



export default clapRouter;