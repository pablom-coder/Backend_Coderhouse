import { Router } from "express";
import {
  saveController,
  getAllController,
  updateProductByIdCont,
  deleteProductByIdCont,
} from "../controllers/rest/products.controllers.js";

const router = Router();

router.post("/add", saveController);
router.get("/list", getAllController);
router.put("/:id", updateProductByIdCont);
router.delete("/:id", deleteProductByIdCont);

export default router;
