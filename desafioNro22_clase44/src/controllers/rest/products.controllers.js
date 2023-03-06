import {
  getAllProducts,
  saveProducts,
  updateProductById,
  deleteProductById,
} from "../../services/rest/products.services.js";

export const saveController = async (req, res) => {
  const { body } = req;
  try {
    const product = await saveProducts(body);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const getAllController = async (req, res) => {
  try {
    const product = await getAllProducts();
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const updateProductByIdCont = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, stock } = req.body;
    const product = await updateProductById(id, name, price, stock);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductByIdCont = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await deleteProductById(id);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};
