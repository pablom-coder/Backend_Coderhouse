import mongoose from "mongoose";


export const cartsCollectionName = "carts";

export const cartsSchema = new mongoose.Schema(
  { productos: { type: Array } },
    { timestamps: true }
);

export const CartsModel =mongoose.model(cartsCollectionName, cartsSchema)
