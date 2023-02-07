import mongoose from 'mongoose';
import Config from '../config/index.js';  

const connectionString = process.env.MONGO_ATLAS || 'mongodb://localhost:27017/coderhouse';

export const initMongoDB = () => {
    return mongoose.connect(Config.MONGO_ATLAS);  
};