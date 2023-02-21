import config from "./config/index.js";
import express from "express";
import productRouter from "./router/productos.js";

const app = express();

app.use(express.json());
app.use("/api", productRouter);

app.listen(config.PUERTO, () => {
  console.log(` Server Up ${config.PUERTO}`);
});
