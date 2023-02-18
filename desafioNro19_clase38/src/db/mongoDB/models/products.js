import mongoose from "mongoose";


export const productsCollectionName = "productos";

export const productsSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, max: 100 },
    price: { type: Number, require: true, max: 1000 },
    codigo: { type: String, require: true, max: 100 },
    stock: { type: Number, required: true },
    descripcion: { type: String, require: true, max: 100 },
    img: { type: String, require: true, max: 100 },
},
{ timestamps: true }
);

export const ProductsModel =mongoose.model(productsCollectionName, productsSchema)
