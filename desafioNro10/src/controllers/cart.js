import moment from "moment";
import {
  CartModel
} from '../models/carrito.js';
import {
  ProductModel
} from '../models/productos.js';

export const checkBodyCart = async (req, res, next) => {
  const {
    timestamp,
    productId
  } = req.body;

  if (!timestamp || !productId)
    return res.status(400).json({
      msg: 'missing Body fields',
    });

  const product = await ProductModel.findById(productId);

  if (!product)
    return res.status(400).json({
      msg: 'Category does not exists',
    });

  next();
};

export const getAllCarts = async (req, res) => {
  try {
    //localhost:8080/api/products?categoryId=kbfisdfh78y83fdf
    const {
      productsId
    } = req.query;

    const query = {};

    if (productsId) {
      query.productsId = productsId;
    }
    const cart = await CartModel.find(query);
    res.json({
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getCartById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const cart = await CartModel.findById(id);
    if (!cart)
      return res.status(404).json({
        msg: 'Cart not found!'
      });

    res.json({
      data: cart,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const createCart = async (req, res) => {
  try {
    //const { timestamp, productId } = req.body;

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

export const addProductsInCart = async (req, res) => {
  try {
    /* if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id de carrito válido!",
      });
    } */

    const cartId = req.params.id;
    const productId = req.body.id;
    console.log(productId);

    let cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }


    let product = await ProductModel.findById(productId);
    /* if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } */
    console.log('idProducto', productId)
    console.log(product)
    let products = cart.products;
    products.push(product);

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      const productAddedToCart = await CartModel.findByIdAndUpdate(
        cart._id, {
          products
        }, {
          new: true
        }
      );

      return res.status(201).json({
        mensaje: "producto agregado al carrito con exito",
        productAddedToCart,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};


export const deleteProductInCartById = async (req, res) => {
  try {

    const cartId = req.params.id;
    const productId = req.params.id_prod;
    const cart = await CartModel.findById(cartId);
    //let cart = await CartModel.findOne({ id: cartId });
    console.log('id cart parametro', cartId)
    if (cart === null) {
      throw new Error("No existe el carrito seleccionado");
    }
    
    let products = cart.products;
    const newProducts = products.filter((element) => element._id != productId);

    console.log('idprodu', productId)

    products = newProducts;
    console.log('id cart', cart._id);
    console.log('new producs', newProducts)
    const addproduct = await CartModel.findByIdAndUpdate(cart._id, {
      products,
    });

    return res.status(201).json({
      mensaje: "producto eliminado del carrito con exito",
      addproduct,
    });
  } catch (error) {
    console.log(error);
  }
};


export const deleteCart = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await CartModel.findByIdAndDelete(id);
    res.json({
      msg: 'cart deleted!'
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};