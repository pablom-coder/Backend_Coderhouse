import config from "./config/index.js";
import express from "express";
import productRouter from "./router/index.js";

const app = express();

app.use(express.json());
app.use("/api", productRouter);

//const PORT = 8080;
app.listen(config.PUERTO, () => {
  console.log(` Server Up ${config.PUERTO}`);
});

export default app;
