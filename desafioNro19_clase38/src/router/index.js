import { Router } from 'express';
import productosRouter from'./productos.js';
import cartRouter from'./cart.js';
import userRouter from'./users.js';

const router = Router();

router.use('/user', userRouter);
router.use('/productos', productosRouter);
router.use('/carrito', cartRouter);

export default router;