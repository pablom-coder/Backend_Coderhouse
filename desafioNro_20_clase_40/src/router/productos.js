import { Router } from "express";
import { isLoggedIn } from "../middlewares/userAutenticated.js";
import {
  getAllController,
  saveController,
} from "../controllers/products.controllers.js";

const router = Router();

router.post("/guardar", saveController);

router.get("/listar", getAllController);

export default router;
