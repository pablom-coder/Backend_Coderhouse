import {
  saveProducts,
  getAllProducts,
  deleteProductById,
} from "../../services/rest/products.services.js";

export const saveController = async ({ data }) => {
  const NewProd = { ...data };
  const product = await saveProducts(NewProd);
  return product;
};

export const getAllController = async () => {
  const products = await getAllProducts();
  return products;
};

export const deleteProductByIdCont = async (args) => {
  const { id } = args;
  const producto = await deleteProductById(id);
  return producto;
};
