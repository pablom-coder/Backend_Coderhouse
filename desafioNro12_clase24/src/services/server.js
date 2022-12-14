import express from 'express';
import mainRouter from'../router/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const ttlSeconds = 6000;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS || "mongodb://localhost:27017/coderhouse",
  }),
  secret: 'secretString', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(StoreOptions));
app.use('/api', mainRouter);

export default app; 
