import express from 'express';
import { getComments, addComment, updateComment } from '../controllers/commentController.js';

const router = express.Router();

router.get('/', getComments);
router.post('/', addComment);
router.put('/:id', updateComment);

export default router;
