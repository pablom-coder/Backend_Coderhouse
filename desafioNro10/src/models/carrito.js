import mongoose from 'mongoose';
import { productCollectionName } from './productos.js';

export const productsCollectionName = 'cart';

const carritoSchema = new mongoose.Schema({
    timestamp: {type: String, required: true},
    /* name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}, */
    products: {
        type: [productCollectionName],
        required: true,
    }
});

export const CartModel = mongoose.model(
    productsCollectionName,
    carritoSchema
);