const { Router } = require('express');
const fs = require('fs/promises');
const path = require('path');
const { ProductsController } = require("../controller/productosApi")
//const asyncHandler = require('express-async-handler')
const filePath = path.resolve(__dirname, '../../productos.json');
const router = Router();

router.get("/", async (req, res) => {
    const data = await ProductsController.getAll()
    res.json({
        msg: data
    })
})

router.get("/:id", async (req, res) => {
    try{
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

router.post("/", async (req, res) => {
    
    const productos = await fs.readFile(filePath, 'utf8');
    const arrayProductos = JSON.parse(productos)

    let nuevoId = 1

    if(arrayProductos.length) {
        nuevoId = arrayProductos[arrayProductos.length - 1].id + 1
    }

    const data = req.body;
    console.log(data);

    const {title, price, thumbnail} = req.body

    const priceNumber = Math.floor(price)

    if(!title || !price || !thumbnail){
        return res.status(400).json({
            msg: "datos invalidos"
        })
    }

    // se crea un nuevo producto y se le envia al controlador

    let nuevoProducto = {
        title,
        price: priceNumber,
		thumbnail,
    }

    const dataController = await ProductsController.saveNewProduct(nuevoProducto)

    res.status(201).json({
        msg: `Se agrego el producto con el id: ${nuevoId}`,
        data: dataController
    })
})

router.put("/:id", async (req, res) => {
    try{
            if (isNaN(req.params.id)) {
                return res.status(400).json({
                error: "ID no valido, verifique!",
                });
            } 
            const id = req.params.id;
        const {title, price, thumbnail} = req.body

        if(!title || !price || !thumbnail){
            return res.status(400).json({
                msg: "Campos invalidos"
            })
        }

        const nuevoProducto = {
            title,
            price,
            thumbnail,
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

module.exports = router;