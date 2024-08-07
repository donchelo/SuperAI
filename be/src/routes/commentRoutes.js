// src/routes/commentRoutes.js
import express from 'express';
import { getComments, addComment } from '../controllers/commentController.js';

const router = express.Router();

router.get('/comments', getComments);
router.post('/comments', addComment);

export default router;
