import { Router } from "express";
const router = Router();
import {
  AllMessages,
  NormalizedMessages,
  DenormalizedMessages,
} from "../controllers/messages.js";

router.get("/all", AllMessages);
router.get("/normalizar", NormalizedMessages);
router.get("/desnormalizar", DenormalizedMessages);

export default router;
