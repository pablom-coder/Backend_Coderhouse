import Router from "koa-router";
import ProductsRouter from "./products.js";

const router = new Router({
  prefix: "/api",
});

router.use(ProductsRouter);

router.get("/", (ctx) => {
  console.log(ctx);
});

/* router.post("/add", saveController);
router.get("/list", getAllController);
router.put("/:id", updateProductByIdCont);
router.delete("/:id", deleteProductByIdCont); */

export default router.routes();
