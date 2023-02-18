import { ProductsModel } from "../db/mongoDB/models/products.js";
import { getAllProductos, getByIdProduct } from "../services/products.services.js";
import { v4 as uuidv4 } from 'uuid';
import { loggerError } from '../helpers/logs.js'

class Products {

    crearProducto = async (newProducto) => {
        try {
            await ProductsModel.create(newProducto)
        } catch (error) {
            loggerError.error("Error al crear producto", error)
        }
    };

    getAll = async (req, res) => {
        try {
            const productos = await getAllProductos();
            res.json({
                msg: productos
            })
        } catch (error) {
            loggerError.error("Error al traer productos", error)
        }
    };

    getById = async (req, res) => {

        const {
            id
        } = req.params;

        try {
            const producto = await getByIdProduct(id)

            res.json({
                msg: producto,
            })
        } catch (error) {
            loggerError.error("Error al traer prod por id", error)
        }
    };

    save = async (req, res) => {

        const {
            body
        } = req;

        const nuevoProducto = {
            title: body.title,
            price: body.price,
            codigo: uuidv4(),
            stock: body.stock,
            descripcion: body.descripcion,
            img: body.url
        }
        try {
            this.crearProducto(nuevoProducto);
            res.json({
                msg: body
            })
        } catch (error) {
            loggerError.error("Error al guardar", error)
        }
    };

    update = async (req, res) => {

        const id = req.params.id;
        const {
            body
        } = req;

        const nuevoProducto = {
            title: body.title,
            price: body.price,
            stock: body.stock,
            descripcion: body.descripcion,
        }

        try {
            await ProductsModel.updateProduct(id, nuevoProducto);
            res.json({
                msg: nuevoProducto
            })
        } catch (error) {
            loggerError.error("Error al actualizar", error)
        }
    };

    deleteById = async (req, res) => {

        const id = req.params.id;

        try {
            await ProductsModel.deleteByIdProduc(id);
            res.json({
                msg: 'Producto eliminado'
            })
        } catch (error) {
            loggerError.error("Error al eliminar", error)
        }
    }
}

export default Products