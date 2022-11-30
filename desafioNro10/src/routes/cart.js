import { Router } from 'express';
import {
  getAllCarts,
  getCartById,
  createCart,
  addProductsInCart,
  deleteCart,
  checkBodyCart,
  deleteProductInCartById,
} from '../controllers/cart.js';

const router = Router();

router.get('/', getAllCarts);

router.get('/:id', getCartById);

//router.post('/', checkBodyCart, createCart);
router.post('/', createCart);

router.post("/:id/productos", addProductsInCart);

router.delete('/:id', deleteCart);

router.delete("/:id/productos/:id_prod", deleteProductInCartById);

export default router;
