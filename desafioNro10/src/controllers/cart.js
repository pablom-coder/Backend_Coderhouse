
import moment from "moment";
import { CartModel } from '../models/carrito.js';
import { ProductModel } from '../models/productos.js';

export const checkBodyCart = async (req, res, next) => {
  const { timestamp, productId } = req.body;

  if (!timestamp|| !productId)
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
    const { productsId } = req.query;

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
    const {id} = req.params;
    const cart = await CartModel.findById(id);
    if(!cart)
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
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    } */

    const cartId = req.params.id;
    const productId = req.body.id;
    console.log(productId);
    //let cart = await CartModel.findOne({ id: cartId });
    let cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    //let product = await ProductModel.findOne({ id: productId });
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
        cart._id,
        { products },
        { new: true }
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
    /* if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
      return res.status(400).json({
        error: "Tiene que enviar parámetros válidos!",
      });
    } */
    const cartId = req.params.id;
    const productId = req.params.id_prod;
    console.log(cartId)
    console.log(productId)
    //const cartId = parseInt(req.params.id);
    //const productId = parseInt(req.params.id_prod);

    let cart = await CartModel.findById(cartId);
    //let cart = await CartModel.findOne({ id: cartId });
    console.log(cart)
    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }
    
    let productExists = cart.products.find((item) => item.id  == productId);
    //.find((item) => item.id == productId);
    
    console.log(productExists)
    if (!productExists) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      let products = cart.products;
      const filteredProducts = products.filter((item) => item.id !== productId);
      products = filteredProducts;

      const productAddedToCart = await CartModel.findByIdAndUpdate(cart._id, {
        products,
      });

      return res.status(201).json({
        mensaje: "producto eliminado del carrito con exito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};



export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { timestamp, productId } = req.body;

    const product = await CartModel.findById(id);
    if(!product)
      return res.status(404).json({
        msg: 'Product not found',
      });
    const cartUpdated = await CartModel.findByIdAndUpdate(
      id,
      { timestamp, productId },
      { new: true }
    );
    res.json({
      msg: 'Cart updated',
      data: cartUpdated
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
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



  /*   async saveCart(element) {
        try {
            const data = await this.getAllProdInCart();
            let id = 1;

            if (data.length) {
                //Si tengo elementos en mi array
                id = data[data.length - 1].id + 1;
            }

            const cart = {
                id: id,
                timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
                products: [element]
            };

            data.push(cart);

            await this.writeProducts(data)
            console.log(`Nuevo carrito guardado, N° ID: ${cart.id}`);

            return cart.id;

        } catch (err) {
            throw new Error("No se pudo guardar el carrito", err)
        }

    }

    async addProdInCart(cartId, prodId) {
        try {
            const carts = await this.getAllProdInCart();
            const index = carts.findIndex((cart) => cart.id === cartId);
            carts[index].products.push(prodId);
            await this.writeProducts(carts);

            return 'Producto agregado!';
        } catch (err) {
            throw new Error("No se pudo agregar el producto al carrito", err)
        }
    }

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getCartById(id) {
        const data = await this.readFileFn()
        const idProducto = data.find((producto) => producto.id === id);

        if (!idProducto) throw  createError(404, 'carrito no encontrado');
            
        return idProducto;

    }


    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(id) {
        const data = await this.readFileFn()

        const cartId = data.findIndex((producto) => producto.id === id);

        if (cartId < 0) {
            throw createError(404, 'El carrito no existe');
        }

        data.splice(cartId, 1);

        await this.writeProducts(data)

    }

    async deleteAll() {
        await this.writeProducts([])
    }

    async deleteProduct(cartId, prodId) {
        try {

            const cartSelected = await this.getAllProdInCart();
            const index = cartSelected.findIndex((cart) => cart.id === cartId);

            console.log(index, 'cart seleccionado');
            console.log(cartId, 'cart id seleccionado')
            if (!index) throw  createError(404, 'carrito no existe');

            const productToDelete = cartSelected[index].products.findIndex(
                (product) => product.id === prodId
              );
              console.log(productToDelete,'hola');
            
            if(productToDelete < 0){
                throw  createError(404, 'El producto no existe en el carrito');
            }

            cartSelected[index].products.splice(productToDelete, 1);
            await this.writeProducts(cartSelected);
            return 'Producto eliminado!';           

        } catch (error) {
            throw error;
            return console.log(error);
        }
    } 
} */



/* const instanciaCartApi = new Contenedor(filePath)

module.exports = {
    CartController: instanciaCartApi
}  */