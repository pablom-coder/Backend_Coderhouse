import Router from "express";
import productsRouter from "./products.js";
import messagesRouter from "./messages.js";
import loginRouter from "./login.js"

const router = Router();

router.use("/productos", productsRouter);
router.use("/mensajes", messagesRouter);
router.use("/login", loginRouter);

export default router;