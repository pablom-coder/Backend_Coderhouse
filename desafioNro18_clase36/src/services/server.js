import express from 'express';
import mainRouter from'../router/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Config from '../config/index.js';  
import passport from "passport";
import { logInFunc, signUpFunc } from './passport-local.js';

const app = express();

app.use(express.json());

const ttlSeconds = 600;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS,
      crypto:{
        secret:'hola',
      },
  }),
  secret: 'secretString', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use('logIn', logInFunc);
passport.use('signUp', signUpFunc);

app.use('/', mainRouter);

export default app; 