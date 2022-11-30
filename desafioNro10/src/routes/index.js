import { Router } from "express";
import productsRouter from './products.js';
import cartRouter from './cart.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/cart', cartRouter);

export default router;



/* const { Router } = require('express')
const routerProductos = require('./products')
const routerCart = require('./cart')

const router = Router()

router.use('/products', routerProductos)
router.use('/cart', routerCart)

module.exports = router; */