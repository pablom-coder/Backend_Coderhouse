import passport from 'passport';

const passportOptions = { badRequestMessage: 'falta username / password' };

export const signUp = (req, res, next) => {
    passport.authenticate('signUp', passportOptions, (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) return res.status(401).json(info);
        res.json({ msg: 'signup OK' })
    })(req, res, next);
}

export const logIn = (req, res) => {
    res.json({ msg: `Bienvenido ${req.user.username}`, user: req.user });
}

export const getHome = (req, res) => {
    res.json(req.session)
}

export const logOut = (req, res, next) => {

    req.logout(function (err) {
        if (err) { return next(err) };
        res.send(`Hasta luego!`);
    });

}