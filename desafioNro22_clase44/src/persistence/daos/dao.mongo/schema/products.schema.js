import mongoose from "mongoose";

export const productsSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    stock: { type: String, required: true },
  }
  /*   {
    versionKey: false,
  } */
);

export const productsModel = mongoose.model("productos", productsSchema);
