import express from 'express';
import { create, destroy } from '../controllers/clapController.js';
import isAuth from '../middlewares/isAuth.js';

const clapRouter = express.Router();

clapRouter.post('/claps/:feedId', isAuth, create);
clapRouter.delete('/claps/:feedId/:userId', isAuth, destroy);


export default clapRouter;