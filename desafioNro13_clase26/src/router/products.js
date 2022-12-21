import { Router } from "express";
const router = Router();
import { getAll } from "../controller/products.js";

router.get("/fackerMock", getAll);

export default router;
