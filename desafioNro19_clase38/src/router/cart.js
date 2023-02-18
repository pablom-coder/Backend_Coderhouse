import { Router } from'express';
import { isLoggedIn } from '../middlewares/userAutenticated.js';
import  Carts from "../controllers/carts.controllers.js"

const router = Router();
const cartsController = new Carts
router.post('/', isLoggedIn, cartsController.createCart);

router.delete('/:id', isLoggedIn, cartsController.deleteCart);

router.get('/:id/productos', isLoggedIn, cartsController.getCartById);

router.post('/:id/productos', isLoggedIn, cartsController.agregarProducto);

router.delete('/:id/productos/:id_prod', isLoggedIn, cartsController.deleteProduct);

router.get("/", cartsController.getAllCarts);
//router.get('/:id/buy', isLoggedIn, buyCart);

export default router;
