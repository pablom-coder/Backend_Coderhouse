import { ProductsModel } from '../db/schema.js'
import { v4 as uuidv4 } from 'uuid';
import { loggerError} from '../helpers/logs.js'


const crearProducto = async (newProducto) => {
    try {
        await ProductsModel.create(newProducto)
    } catch (error) {
        loggerError.error("Error al crear producto", error)
    }
};

export const getAll = async (req, res) => {
    try {
        const productos = await ProductsModel.find();
        res.json({
            msg: productos
        })
    } catch (error) {
        loggerError.error("Error al traer productos", error)
    }
};

export const getById = async (req, res) => {

    const { id } = req.params;

    try {
        const producto = await ProductsModel.findById(id)

        res.json({
            msg: producto,
        })
    } catch (error) {
        loggerError.error("Error al traer prod por id", error)
    }
};

export const save = async (req, res) => {

    const { body } = req;

    const nuevoProducto = {
        title: body.title,
        price: body.price,
        codigo: uuidv4(),
        stock: body.stock,
        descripcion: body.descripcion,
        img: body.url
    }
    try {
        crearProducto(nuevoProducto);
        res.json({
            msg: body
        })
    } catch (error) {
        loggerError.error("Error al guardar", error)
    }
};

export const update = async (req, res) => {

    const id = req.params.id;
    const { body } = req;

    const nuevoProducto = {
        title: body.title,
        price: body.price,
        stock: body.stock,
        descripcion: body.descripcion,
    }

    try {
        await ProductsModel.findByIdAndUpdate(id, nuevoProducto);
        res.json({
            msg: nuevoProducto
        })
    } catch (error) {
        loggerError.error("Error al actualizar", error)
    }
};

export const deleteById = async (req, res) => {

    const id = req.params.id;

    try {
        await ProductsModel.findByIdAndDelete(id);
        res.json({
            msg: 'Producto eliminado'
        })
    } catch (error) {
        loggerError.error("Error al eliminar", error)
    }
};