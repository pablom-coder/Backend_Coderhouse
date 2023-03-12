import Router from "koa-router";
import {
  getAllController,
  getById,
  saveController,
  updateProductByIdCont,
  deleteProductByIdCont,
} from "../controllers/products.controllers.js";

const router = new Router({
  prefix: "/products",
});

router.get("/", getAllController);

router.get("/:id", getById);

router.post("/", saveController);

router.put("/:id", updateProductByIdCont);

router.delete("/:id", deleteProductByIdCont);

export default router.routes();
