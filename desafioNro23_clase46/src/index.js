import Koa from "koa";
import koaBody from "koa-body";
import mainRouter from "./router/index.js";
import config from "./config/index.js";

//import { initMongoDB } from "./database/init.js";

const app = new Koa();

app.use(koaBody());
app.use(mainRouter);

const server = app.listen(config.PUERTO, () =>
  console.log(` Server Koa escuchando en el puerto ${config.PUERTO}`)
);

server.on("error", (error) => console.info("Error en Servidor Koa:", error));
