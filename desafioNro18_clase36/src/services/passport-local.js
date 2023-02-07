import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../db/schema.js";
import { logger, loggerError } from '../helpers/logs.js'

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};


const signUp = async (req, username, password, done) => {

    try {

        const name = req.body.name;
        const phoneNumber = req.body.phoneNumber;
        const addres = req.body.addres;

        const usuarioNuevo = await UserModel.create({ username, password, phoneNumber, addres, name });

        usuarioNuevo.password = await usuarioNuevo.encryptPassword(password);
        await usuarioNuevo.save();

        logger.info("SIGNUP OK");

        return done(null, usuarioNuevo);

    } catch (error) {

        loggerError.error(error);
        return done(null, false)

    }

}

const logIn = async (req, username, password, done) => {


    const usuario = await UserModel.findOne({ username });

    if (!usuario) {

        loggerError.error('LogIn datos incorrectos');
        return done(null, false);
    } else {

        const compare = await usuario.comparePassword(password);
        compare ? done(null, usuario) : done(null, false);
        logger.info("LOGIN OK");

    }

}

export const logInFunc = new LocalStrategy(strategyOptions, logIn);
export const signUpFunc = new LocalStrategy(strategyOptions, signUp);

passport.serializeUser((user, done) => {

    done(null, user._id);

});

passport.deserializeUser((userID, done) => {

    const usuario = UserModel.findById(userID);
    return done(null, usuario);

});