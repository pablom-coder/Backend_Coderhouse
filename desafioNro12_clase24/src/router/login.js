import { Router } from "express";
const router = Router();
import { logIn, verifyLogIn, logout } from "../controller/logIn.js";

router.post('/logIn', logIn);

router.get('/verifyLogIn', verifyLogIn);

router.post('/logout', logout);

export default router;
