import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user.model.js";

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};


const signUp = async (req, username, password, done) => {

    console.log("SIGNUP OK");

    try {

        const usuarioNuevo = await UserModel.create({ username, password });

        usuarioNuevo.password = await usuarioNuevo.encryptPassword(password);
        await usuarioNuevo.save();

        return done(null, usuarioNuevo);

    } catch (error) {

        console.log(error);
        return done(null, false)

    }

}

const logIn = async (req, username, password, done) => {

    console.log("LOGIN OK");

    const usuario = await UserModel.findOne({ username });

    if (!usuario) {

        return done(null, false);

    } else {

        console.log("Usuario encontrado");
        const compare = await usuario.comparePassword(password);
        console.log(compare)
        compare ? done(null, usuario) : done(null, false);

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