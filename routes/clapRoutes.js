import express from 'express';
import { create } from '../controllers/clapController.js';

const clapRouter = express.Router();

clapRouter.post('/claps/:feedId', create);

export default clapRouter;