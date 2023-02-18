import { Router } from'express';
import { isLoggedIn } from '../middlewares/userAutenticated.js';
import  Products from "../controllers/products.controllers.js"

const router = Router();
const productsController = new Products

router.get('/', isLoggedIn,productsController.getAll);

//router.get('/:id', isLoggedIn, getById);

router.post('/', isLoggedIn,productsController.save);

router.put('/:id', isLoggedIn,productsController.update);

router.delete('/:id', isLoggedIn, productsController.deleteById);

export default router;