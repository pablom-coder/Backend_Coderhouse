import { Router } from "express";
import productosRouter from "./productos.js";

import userRouter from "./users.js";

const router = Router();

router.use("/user", userRouter);
router.use("/productos", productosRouter);

export default router;
