import { Router } from 'express';
import {
  getAllProductos,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.js';
const router = Router();

router.get('/', getAllProductos);

router.get('/:id', getProductsById);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;












/* const {Router} = require('express');
const {ProductsController} = require('../controllers/product');
const {isAdmin} = require('../middlewares/checkAdmin');
const fs = require('fs/promises');
const path = require('path');
const filePath = path.resolve(__dirname, "../products.json");
//const { isatty } = require('tty');

const router = Router()

router.get("/", async (req, res, next) => {
    try{
        const data = await ProductsController.getAll();
        res.json({
            msg: data
        })
    }catch (error){
        next(error)
    }
})

router.get("/:id", async (req, res) => {
    try{
        if (isNaN(req.params.id)) {
            return res.status(400).json({
            error: "ID no valido, verifique!",
            });
        } 
       const id = req.params.id;
       const product = await ProductsController.getById(id);

        res.json({
            msg: `id del productos: ${id}`,
            msg2: product
        })
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || "internal server error";

        console.log(err.stack)

        res.status(status).json(
            {
                message
            }
        )
    }
})

router.post("/", isAdmin, async (req, res) => {
    
    const productos = await fs.readFile(filePath, 'utf8');
    const arrayProductos = JSON.parse(productos)

    let nuevoId = 1

    if(arrayProductos.length) {
        nuevoId = arrayProductos[arrayProductos.length - 1].id + 1
    }

    const data = req.body;
    console.log(data);

    const {title, price, thumbnail,timestamp, codigo, stock} = req.body

    const priceNumber = Math.floor(price)

    if(!title || !price || !thumbnail || !stock){
        return res.status(400).json({
            msg: "datos invalidos"
        })
    }

    // se crea un nuevo producto y se le envia al controlador
    //const tiempo = moment().format("DD-MM-YYYY HH:MM:SS")
    let nuevoProducto = {
        title,
        price: priceNumber,
        thumbnail,
        timestamp,
		codigo,
        stock,
    }

    const dataController = await ProductsController.saveNewProduct(nuevoProducto)

    res.status(201).json({
        msg: `Se agrego el producto con el id: ${nuevoId}`,
        data: dataController
    })
})

router.put("/:id", isAdmin, async (req, res) => {
    try{
            if (isNaN(req.params.id)) {
                return res.status(400).json({
                error: "ID no valido, verifique!",
                });
            } 
        const id = req.params.id;
        const {title, price, thumbnail, timestamp, codigo, stock} = req.body

        if(!title && !price && !thumbnail && !codigo && !stock){
            return res.status(400).json({
                msg: "Campos invalidos"
            })
        }

        const nuevoProducto = {
            title,
            price,
            thumbnail,
            timestamp,
            codigo,
            stock
        }

        const productoActualizado = await ProductsController.updateById(id, nuevoProducto)

        console.log(id)
       
        res.status(200).json({
            data: productoActualizado,
        })
    }catch(error){
        return res.status(404).json({
            error: error,
          });
    }
})

router.delete("/:id", async (req, res) => {
    try{
        if (isNaN(req.params.id)) {
            return res.status(400).json({
              error: "ID no valido, verifique!",
            });
        } 
        const id = req.params.id;
        console.log('id', id)
        const message = await ProductsController.deleteById(id)

        res.status(200).json({
            msg: message
        })
    }catch(error){
        return res.status(404).json({
            error: error,
        })
    }
})

module.exports = router */