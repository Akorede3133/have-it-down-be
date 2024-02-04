import express from 'express';
import { create } from '../controllers/clapController.js';
import isAuth from '../middlewares/isAuth.js';

const clapRouter = express.Router();

clapRouter.post('/claps/:feedId', isAuth, create);

export default clapRouter;