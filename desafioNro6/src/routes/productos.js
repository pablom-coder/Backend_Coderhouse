const { Router } = require('express');
const fs = require('fs/promises');
const path = require('path');
const { ProductsController } = require("../controller/productosApi")
//const asyncHandler = require('express-async-handler')
const filePath = path.resolve(__dirname, '../../productos.json');
const router = Router();

/* router.get("/productos", async (req, res) => {
    const data = await ProductsController.getAll()
    const cantidadObjetos = data.length
    const validarArray = cantidadObjetos > 0 ? true : false
    res.render("showProducts", { productos: data, cantidad: validarArray})
}) */


router.get("/", async (req, res) => {
    try {
        const product = await ProductsController.getAll()
        const cantidadObjetos = data.length
        const validarArray = cantidadObjetos > 0 ? true : false
        res.render("formulario", { productos: data, cantidad: validarArray})
        /* let count = product.length;
        if (count > 0){
            res.render('formulario', {
                productos: product,                
                msg: 'Vista de Productos'
            })
        }else
        {
            res.render('formulario', {
                productos: product,
                msg: 'Vista de Productos - No hay Procuctos'
            })
        } */
    } catch (error) {
        next(error);
    }
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

    //const dataController = await ProductsController.saveNewProduct(nuevoProducto)
    await ProductsController.saveNewProduct(nuevoProducto)
    //res.redirect('/')

    /* res.status(201).json({
        msg: `Se agrego el producto con el id: ${nuevoId}`,
        data: dataController
    }) */
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {title, price, thumbnail} = req.body

    if(!title || !price || !thumbnail){
        return res.status(400).json({
            msg: "datos invalidos"
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

})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const message = await ProductsController.deleteById(id)

    res.json({
        msg: message
    })
})

module.exports = router;