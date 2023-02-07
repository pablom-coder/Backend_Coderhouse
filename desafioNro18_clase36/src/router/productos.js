import { Router } from'express';
import { getAll, getById, save, update, deleteById} from'../controllers/productos.js';
import { isLoggedIn } from '../middlewares/userAutenticated.js';

const router = Router();

router.get('/', isLoggedIn, getAll);

router.get('/:id', isLoggedIn, getById);

router.post('/', isLoggedIn, save);

router.put('/:id', isLoggedIn, update);

router.delete('/:id', isLoggedIn, deleteById);

export default router;