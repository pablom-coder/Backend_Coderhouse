import { Router } from "express";
const router = Router();
import { getAll } from "../controllers/products.js";

router.get("/fackerMock", getAll);

export default router;
