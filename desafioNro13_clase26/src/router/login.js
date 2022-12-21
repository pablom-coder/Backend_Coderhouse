import { Router } from "express";
const router = Router();
import { signUp, logIn, getHome, logOut } from "../controller/logIn.js";
import passport from 'passport';
import { isLoggedIn } from '../middlewares/userAutenticated.js';

const passportOptions = { badRequestMessage: 'Error en el body' };

router.post('/signUp', signUp);

router.post('/logIn', passport.authenticate( 'logIn', passportOptions), logIn);

router.get('/home', isLoggedIn, getHome);

router.get('/logout', logOut);

export default router;
