import { CartsModel } from "../db/mongoDB/models/carts.js";
import { getAllCarts, getCartById } from "../services/carts.services.js";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import {logger, loggerError} from '../helpers/logs.js'

class Carts {
  constructor(products) {
    this.products = products;
  }

  createCart = async (req, res) => {

    try {
    
        let timestamp = moment().format("DD-MM-YYYY HH:MM:SS");
        let products = [];
    
        const newCart = await CartsModel.create({
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

getAllCarts = async (req, res) => {
  try {
    const carts = await getAllCarts()
    res.json({
      data: carts,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

deleteCart = async (req, res) => {

  const id = req.params.id;

  try {
      await CartsModel.findByIdAndDelete(id)
      res.json({
          msg: `Cart eliminado`
      });
  } catch (error) {
      loggerError.error("Error al eliminar carrito", error)
  }
};

getCartById = async (req, res) => {

  const id = req.params.id;

  try {
      const cart = await CartsModel.findOne({ id: id });
      res.json({
          msg: cart
      });
  } catch (error) {
      loggerError.error("Error al traer carrito por id", error)
  }
};

agregarProducto = async (req, res) => {

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
      await CartsModel.findByIdAndUpdate(id, nuevoProducto);
      res.json({
          msg: `Agrego un producto al carrito`
      });
  } catch (error) {
      loggerError.error("Error al agregar producto al carrito", error)
  }
};

deleteProduct = async (req, res) => {

  const idCart = req.params.id;
  const idProduct = req.params.id_prod;

  try {
      //const cart = await CartsModel.findOne({ id: idCart });
      const cart = await getCartById(idCart );
      const indiceProducto = cart.productos.findIndex(prodId => prodId.id === idProduct);

      cart.productos.splice(indiceProducto, 1);

      await CartsModel.findByIdAndUpdate(idCart, cart);

      res.json({
          msg: `Elimine el producto con ID ${idProduct}`
      });
  } catch (error) {
      loggerError.error("Error al eliminar producto de carrito", error)
  }
};

buyCart = async (req, res) => {

  const id = req.params.id;

  try {
      const cart = await CartsModel.findOne({ id: id });
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
}

export default Carts
