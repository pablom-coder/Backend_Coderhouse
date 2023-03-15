import express, { Express, Request, Response } from "npm:express";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const app: Express = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Bienvenidos a Deno desde express!!");
});

app.post("/", (req: Request, _res: Response) => {
  console.log(req.body);
});

app.listen(config().PORT);
console.log(`Server ok on port ${config().PORT}`);
