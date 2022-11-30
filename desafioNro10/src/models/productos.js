import mongoose from 'mongoose';

export const productCollectionName = 'products';

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    thumbnail: {type: String, required: true},
});

export const ProductModel = mongoose.model(productCollectionName, productSchema);