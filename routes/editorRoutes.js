import express from 'express';
import { uploadFile, fetchUrl } from '../controllers/editorController.js';
import upload from '../utils/upload.js';

const editorRouter = express.Router();

editorRouter.post('/uploadImage', upload.single('image'), uploadFile);
editorRouter.post('/fetchUrl', fetchUrl );

export default editorRouter;