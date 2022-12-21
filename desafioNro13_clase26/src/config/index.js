import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_ATLAS: process.env.MONGO_ATLAS || 'mongodb://localhost/coderhouse',
    PUERTO: process.env.PUERTO || 8080,
}