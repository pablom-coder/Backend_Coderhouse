//import { productsModel } from "../persistence/daos/dao.mongo/schema/products.schema.js";
import {
  saveProducts,
  getAllProducts,
  getProducts,
  updateProductById,
  deleteProductById,
} from "../services/products.services.js";

export const saveController = async (ctx, next) => {
  console.log(ctx.request);
  const data = ctx.request.body;

  const result = await saveProducts(data);

  ctx.body = {
    status: "success",
    data: result,
  };
  ctx.status = 201;
};

export const getAllController = async (ctx, next) => {
  try {
    ctx.body = {
      status: "success",
      data: await getAllProducts({}),
    };
    ctx.status = 200;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductByIdCont = async (ctx, next) => {
  try {
    const { id } = ctx.params;

    const data = ctx.request.body;

    await updateProductById(id, data);

    ctx.body = {
      status: "success",
      data: data,
    };
    ctx.status = 200;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductByIdCont = async (ctx, next) => {
  try {
    const { id } = ctx.params;
    await deleteProductById(id);

    ctx.status = 200;
    ctx.body = {
      status: "success",
      message: `Remera eliminada id: ${id}`,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (ctx, next) => {
  try {
    const { id } = ctx.params;
    ctx.body = {
      status: "success",
      data: await getProducts(id),
    };
    ctx.status = 200;
  } catch (error) {
    console.log(error);
  }
};
