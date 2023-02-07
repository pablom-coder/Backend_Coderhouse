import { Router } from'express';
import  {createCart, deleteCart, getCartById, agregarProducto, deleteProduct, buyCart} from'../controllers/cart.js';
import { isLoggedIn } from '../middlewares/userAutenticated.js';

const router = Router();

router.post('/', isLoggedIn, createCart);

router.delete('/:id', isLoggedIn, deleteCart);

router.get('/:id/productos', isLoggedIn, getCartById);

router.post('/:id/productos', isLoggedIn, agregarProducto);

router.delete('/:id/productos/:id_prod', isLoggedIn, deleteProduct);

router.get('/:id/buy', isLoggedIn, buyCart);

export default router;
