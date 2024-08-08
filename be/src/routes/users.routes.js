import { Router } from 'express';
import { getUsuarios, getUsuario, deleteUsuario, createUsuario, updateUsuario } from '../controllers/users.controllers.js';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario)
router.post('/', createUsuario);
router.delete('/:id', deleteUsuario)
router.put('/:id', updateUsuario)

export default router;