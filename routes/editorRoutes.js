import express from 'express';
import uploadFile from '../controllers/editorController.js';
import upload from '../utils/upload.js';

const editorRouter = express.Router();

editorRouter.post('/uploadImage', upload.single('image'), uploadFile);

export default editorRouter;