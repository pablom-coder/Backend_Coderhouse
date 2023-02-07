import { CartModel, UserModel } from '../db/schema.js';
import { v4 as uuidv4 } from 'uuid';
import { buyCartGmail } from '../controllers/email.js';
import { sendWsp } from '../controllers/whatsapp.js'
import {logger, loggerError} from '../helpers/logs.js'
import moment from "moment";


export const createCart = async (req, res) => {

    try {
    
        let timestamp = moment().format("DD-MM-YYYY HH:MM:SS");
        let products = [];
    
        const newCart = await CartModel.create({
          timestamp,
          products
        });
    
        res.status(201).json({
          data: newCart,
          mensaje: 'carrito creado con exito',
        })
      } catch (err) {
        res.status(500).json({
          error: err.message
        });
      }    
};

export const deleteCart = async (req, res) => {

    const id = req.params.id;

    try {
        await CartModel.findByIdAndDelete(id)
        res.json({
            msg: `Cart eliminado`
        });
    } catch (error) {
        loggerError.error("Error al eliminar carrito", error)
    }
};

export const getCartById = async (req, res) => {

    const id = req.params.id;

    try {
        const cart = await CartModel.findOne({ id: id });
        res.json({
            msg: cart
        });
    } catch (error) {
        loggerError.error("Error al traer carrito por id", error)
    }
};

export const agregarProducto = async (req, res) => {

    const id = req.params.id;
    const { body } = req;

    const nuevoProducto =
    {
        $push: {
            productos: {
                id: uuidv4(),
                title: body.title,
                price: body.price,
                cantidad: body.cantidad,
            }
        }
    };

    try {
        await CartModel.findByIdAndUpdate(id, nuevoProducto);
        res.json({
            msg: `Agrego un producto al carrito`
        });
    } catch (error) {
        loggerError.error("Error al agregar producto al carrito", error)
    }
};

export const deleteProduct = async (req, res) => {

    const idCart = req.params.id;
    const idProduct = req.params.id_prod;

    try {
        const cart = await CartModel.findOne({ id: idCart });
        const indiceProducto = cart.productos.findIndex(prodId => prodId.id === idProduct);

        cart.productos.splice(indiceProducto, 1);

        await CartModel.findByIdAndUpdate(idCart, cart);

        res.json({
            msg: `Elimine el producto con ID ${idProduct}`
        });
    } catch (error) {
        loggerError.error("Error al eliminar producto de carrito", error)
    }
};

export const buyCart = async (req, res) => {

    const id = req.params.id;

    try {
        const cart = await CartModel.findOne({ id: id });
        const data =  JSON.stringify(cart.productos, null, "\t")

        const user = await UserModel.findOne({ id: req.session.passport.user});

        buyCartGmail(user.name, data, user.username);
        sendWsp(user.phoneNumber);

        res.json({
            msg: `Pedido enviado!`
        });

    } catch (error) {
        loggerError.error("Error al realizar pedido", error)
    }

};